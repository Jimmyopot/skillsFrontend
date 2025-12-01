import { useEffect, useRef, useState, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

/**
 * useSignalR hook
 * - hubUrl: full websocket hub url (e.g. `${window.location.origin}/hubs/chat`)
 * - getAccessToken: () => token string for Authorization header
 * - handlers: { onReceiveMessage, onMessageSent, onMessageRead, onTyping, onConnected, onDisconnected }
 */
export default function useSignalR({
  hubUrl,
  getAccessToken,
  handlers = {},
} = {}) {
  const connectionRef = useRef(null);
  const handlersRef = useRef(handlers);
  const [connectionState, setConnectionState] = useState("disconnected");

  // Update handlers ref when handlers change
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  const start = useCallback(async () => {
    if (!hubUrl) throw new Error("hubUrl is required for useSignalR");

    // if already connected, skip
    if (connectionRef.current) {
      return connectionRef.current;
    }

    const token = getAccessToken ? getAccessToken() : null;

    const conn = new signalR.HubConnectionBuilder()
      .withUrl(
        hubUrl,
        token
          ? {
              accessTokenFactory: () => token,
            }
          : {}
      )
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // wire handlers using ref to get latest handlers
    conn.on("ReceiveMessage", (message) => {
      handlersRef.current.onReceiveMessage?.(message);
    });

    conn.on("MessageSent", (message) => {
      handlersRef.current.onMessageSent?.(message);
    });

    conn.on("MessageRead", (payload) => {
      handlersRef.current.onMessageRead?.(payload);
    });

    conn.on("Typing", (payload) => {
      handlersRef.current.onTyping?.(payload);
    });

    conn.onreconnecting((error) => {
      setConnectionState("reconnecting");
      handlersRef.current.onReconnecting?.(error);
    });

    conn.onreconnected((connectionId) => {
      setConnectionState("connected");
      handlersRef.current.onReconnected?.(connectionId);
    });

    conn.onclose((err) => {
      setConnectionState("disconnected");
      handlersRef.current.onDisconnected?.(err);
    });

    try {
      await conn.start();
      connectionRef.current = conn;
      setConnectionState("connected");
      handlersRef.current.onConnected?.();
      return conn;
    } catch (err) {
      setConnectionState("error");
      console.error("SignalR start failed:", err);
      throw err;
    }
  }, [hubUrl, getAccessToken]);

  const stop = useCallback(async () => {
    const conn = connectionRef.current;
    if (!conn) return;
    try {
      await conn.stop();
    } catch (e) {
      // ignore
    }
    connectionRef.current = null;
    setConnectionState("disconnected");
  }, []);

  const sendMessage = useCallback(
    async (receiverId, text, skillExchangeSessionId = null) => {
      const conn = connectionRef.current;
      if (!conn) throw new Error("SignalR connection not started");
      return conn.invoke(
        "SendMessage",
        receiverId,
        text,
        skillExchangeSessionId
      );
    },
    []
  );

  const markAsRead = useCallback(async (messageIds = []) => {
    const conn = connectionRef.current;
    if (!conn) throw new Error("SignalR connection not started");
    return conn.invoke("MarkAsRead", messageIds);
  }, []);

  const joinSession = useCallback(async (sessionId) => {
    const conn = connectionRef.current;
    if (!conn) throw new Error("SignalR connection not started");
    return conn.invoke("JoinSession", sessionId);
  }, []);

  const leaveSession = useCallback(async (sessionId) => {
    const conn = connectionRef.current;
    if (!conn) throw new Error("SignalR connection not started");
    return conn.invoke("LeaveSession", sessionId);
  }, []);

  const getConnectionId = useCallback(
    () => connectionRef.current?.connectionId,
    []
  );

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().catch(() => {});
        connectionRef.current = null;
      }
    };
  }, []);

  return {
    start,
    stop,
    sendMessage,
    markAsRead,
    joinSession,
    leaveSession,
    getConnectionId,
    connectionState,
    connection: connectionRef,
  };
}
