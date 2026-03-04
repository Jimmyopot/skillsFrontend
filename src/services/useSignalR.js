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

  /**
   * FIX 1: Wait for a valid token before proceeding.
   * This handles the race condition where Redux hasn't hydrated yet
   * but the component already tried to connect.
   */
  const waitForToken = useCallback(
    (timeoutMs = 5000) => {
      return new Promise((resolve, reject) => {
        const token = getAccessToken();
        if (token) return resolve(token);

        const interval = setInterval(() => {
          const t = getAccessToken();
          if (t) {
            clearInterval(interval);
            resolve(t);
          }
        }, 100);

        setTimeout(() => {
          clearInterval(interval);
          const t = getAccessToken();
          if (t) return resolve(t);
          reject(new Error("Timed out waiting for access token"));
        }, timeoutMs);
      });
    },
    [getAccessToken],
  );

  const start = useCallback(async () => {
    if (!hubUrl) throw new Error("hubUrl is required for useSignalR");

    // Check if already connected or connecting
    if (connectionRef.current) {
      const state = connectionRef.current.state;
      if (state === signalR.HubConnectionState.Connected) {
        console.log("SignalR already connected, reusing connection");
        return connectionRef.current;
      }
      if (state === signalR.HubConnectionState.Connecting) {
        console.log("SignalR connection in progress, waiting...");
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (
              connectionRef.current?.state ===
              signalR.HubConnectionState.Connected
            ) {
              clearInterval(checkInterval);
              resolve(connectionRef.current);
            }
          }, 100);
          setTimeout(() => {
            clearInterval(checkInterval);
            resolve(connectionRef.current);
          }, 5000);
        });
      }
    }

    setConnectionState("connecting");

    if (!getAccessToken) {
      const errMsg =
        "getAccessToken function is required for SignalR connection.";
      console.error(errMsg);
      setConnectionState("error");
      throw new Error(errMsg);
    }

    /**
     * FIX 2: Wait for the token BEFORE building the connection.
     * This prevents the negotiate request from firing before auth is ready.
     */
    try {
      await waitForToken(5000);
    } catch (err) {
      setConnectionState("error");
      console.error("Cannot start SignalR: no token available.", err);
      throw err;
    }

    /**
     * FIX 3: accessTokenFactory is async — SignalR supports this.
     * It will always fetch a fresh token at connection time AND on reconnect,
     * avoiding stale/missing token issues.
     */
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: async () => {
          const token = getAccessToken();
          if (token) return token;

          // Last-resort: wait up to 3s for the token to appear
          try {
            return await waitForToken(3000);
          } catch {
            throw new Error(
              "No access token available during SignalR negotiation",
            );
          }
        },
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Warning) // reduce noise; change to Information for debug
      .build();

    // Wire handlers using ref so we always call the latest version
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

    conn.on("NewNotification", (notification) => {
      handlersRef.current.onNewNotification?.(notification);
    });

    conn.on("UnreadCountUpdate", (count) => {
      handlersRef.current.onUnreadCountUpdate?.(count);
    });

    conn.on("AllNotificationsMarkedRead", () => {
      handlersRef.current.onAllNotificationsMarkedRead?.();
    });

    conn.onreconnecting((error) => {
      console.warn("SignalR reconnecting...", error?.message);
      setConnectionState("reconnecting");
      handlersRef.current.onReconnecting?.(error);
    });

    conn.onreconnected((connectionId) => {
      console.log("SignalR reconnected:", connectionId);
      setConnectionState("connected");
      handlersRef.current.onReconnected?.(connectionId);
    });

    conn.onclose((err) => {
      console.warn("SignalR connection closed:", err?.message);
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
  }, [hubUrl, getAccessToken, waitForToken]);

  const stop = useCallback(async () => {
    const conn = connectionRef.current;
    if (!conn) return;
    try {
      await conn.stop();
    } catch {
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
        skillExchangeSessionId,
      );
    },
    [],
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
    [],
  );

  useEffect(() => {
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







// import { useEffect, useRef, useState, useCallback } from "react";
// import * as signalR from "@microsoft/signalr";

// /**
//  * useNotifications
//  * Connects to /hubs/notifications and listens for:
//  *  - NewNotification  → adds to list, bumps unread count
//  *  - UnreadCountUpdate → syncs badge count from server
//  *  - AllNotificationsMarkedRead → clears badge
//  *
//  * @param {object} options
//  * @param {string}   options.hubUrl          - e.g. "https://api.nipenikupe.top/hubs/notifications"
//  * @param {Function} options.getAccessToken  - () => string | null
//  * @param {boolean}  options.enabled         - only connect when user is authenticated
//  */
// export default function useNotifications({
//   hubUrl,
//   getAccessToken,
//   enabled = true,
// } = {}) {
//   const connectionRef = useRef(null);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [connectionState, setConnectionState] = useState("disconnected");

//   // ── wait up to `ms` for a token to appear ──────────────────────────────────
//   const waitForToken = useCallback(
//     (ms = 5000) =>
//       new Promise((resolve, reject) => {
//         const t = getAccessToken?.();
//         if (t) return resolve(t);

//         const iv = setInterval(() => {
//           const tok = getAccessToken?.();
//           if (tok) {
//             clearInterval(iv);
//             resolve(tok);
//           }
//         }, 100);

//         setTimeout(() => {
//           clearInterval(iv);
//           const tok = getAccessToken?.();
//           tok ? resolve(tok) : reject(new Error("Timed out waiting for token"));
//         }, ms);
//       }),
//     [getAccessToken],
//   );

//   useEffect(() => {
//     if (!enabled || !hubUrl) return;

//     let mounted = true;

//     const connect = async () => {
//       // Don't create a second connection
//       if (connectionRef.current) return;

//       try {
//         await waitForToken(5000);
//       } catch {
//         console.warn("NotificationHub: no token, skipping connection");
//         return;
//       }

//       const conn = new signalR.HubConnectionBuilder()
//         .withUrl(hubUrl, {
//           accessTokenFactory: async () => {
//             const tok = getAccessToken?.();
//             if (tok) return tok;
//             return waitForToken(3000);
//           },
//         })
//         .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
//         .configureLogging(signalR.LogLevel.Warning)
//         .build();

//       // ── event handlers ────────────────────────────────────────────────────
//       conn.on("NewNotification", (notification) => {
//         if (!mounted) return;
//         setNotifications((prev) => {
//           // Deduplicate by notificationId
//           const exists = prev.some(
//             (n) => n.notificationId === notification.notificationId,
//           );
//           if (exists) return prev;
//           return [notification, ...prev]; // newest first
//         });
//         setUnreadCount((c) => c + 1);
//       });

//       conn.on("UnreadCountUpdate", (count) => {
//         if (!mounted) return;
//         setUnreadCount(typeof count === "number" ? count : 0);
//       });

//       conn.on("AllNotificationsMarkedRead", () => {
//         if (!mounted) return;
//         setUnreadCount(0);
//         setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//       });

//       conn.onreconnecting(() => mounted && setConnectionState("reconnecting"));
//       conn.onreconnected(() => mounted && setConnectionState("connected"));
//       conn.onclose(() => {
//         if (mounted) setConnectionState("disconnected");
//         connectionRef.current = null;
//       });

//       try {
//         await conn.start();
//         if (!mounted) {
//           conn.stop();
//           return;
//         }
//         connectionRef.current = conn;
//         setConnectionState("connected");
//         console.log("NotificationHub connected");
//       } catch (err) {
//         console.error("NotificationHub failed to connect:", err);
//         setConnectionState("error");
//       }
//     };

//     connect();

//     return () => {
//       mounted = false;
//       connectionRef.current?.stop().catch(() => {});
//       connectionRef.current = null;
//       setConnectionState("disconnected");
//     };
//   }, [enabled, hubUrl, getAccessToken, waitForToken]);

//   // ── helpers the UI can call ────────────────────────────────────────────────
//   const markOneRead = useCallback((notificationId) => {
//     setNotifications((prev) =>
//       prev.map((n) =>
//         n.notificationId === notificationId ? { ...n, isRead: true } : n,
//       ),
//     );
//     setUnreadCount((c) => Math.max(0, c - 1));
//   }, []);

//   const markAllRead = useCallback(() => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     setUnreadCount(0);
//   }, []);

//   const clearNotification = useCallback((notificationId) => {
//     setNotifications((prev) =>
//       prev.filter((n) => n.notificationId !== notificationId),
//     );
//   }, []);

//   return {
//     notifications,
//     unreadCount,
//     connectionState,
//     markOneRead,
//     markAllRead,
//     clearNotification,
//   };
// }