/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Drawer,
  Avatar,
  AppBar,
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Stack,
  TextField,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useTheme } from "@mui/material/styles";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import useSignalR from "../../../services/useSignalR";
import { config } from "../../../utils/config";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatTime(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function MessageChat({ open, toggleDrawer, selectedUser }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chatPartner = useMemo(() => {
    if (!selectedUser) return null;
    return {
      id: selectedUser.userId || selectedUser.id,
      name: selectedUser.name || selectedUser.fullName,
      location:
        selectedUser.location ||
        `${selectedUser.cityOrTown}, ${selectedUser.country || "Kenya"}`,
      profilePicture: selectedUser.profilePicture,
      skillsOffered: selectedUser.skillsOffered || [],
      skillsNeeded: selectedUser.skillsNeeded || [],
      rating: selectedUser.rating || 0,
      completedTrades: selectedUser.completedTrades || 0,
      isOnline: true,
    };
  }, [selectedUser]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeForm, setTradeForm] = useState({
    skillOffering: "",
    skillRequesting: "",
    message: "",
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [currentSessionId] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const authState = useSelector((state) => state.LoginReducer);

  const myUserId = useMemo(() => {
    let userId =
      authState.user?.userId ||
      authState.user?.id ||
      authState.user?.ID ||
      authState.user?.UserId;

    if (!userId) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          userId =
            parsedUser?.userId ||
            parsedUser?.id ||
            parsedUser?.ID ||
            parsedUser?.UserId;
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }

    if (!userId) {
      userId = localStorage.getItem("userId");
    }

    return userId;
  }, [authState.user]);

  const getToken = useCallback(() => {
    return authState.token || localStorage.getItem("authToken") || null;
  }, [authState.token]);

  /**
   * FIX: Derive a boolean that is only true when we KNOW the token exists.
   * The SignalR effect uses this as a dependency so it won't run until auth
   * is ready, eliminating the race condition that caused the intermittent 401.
   */
  const isAuthReady = useMemo(() => Boolean(getToken()), [getToken]);

  // Early return if drawer is open but no user is selected
  if (open && !selectedUser) {
    return (
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: isMobile ? "100vw" : "70vw",
            p: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Please select a user to start messaging
          </Typography>
        </Box>
      </Drawer>
    );
  }

  const mapServerMessage = useCallback(
    (msg) => {
      if (!msg) return null;
      const id = msg.id || msg.Id || msg.messageId || `${Date.now()}`;
      const senderId = msg.senderId || msg.SenderId || msg.sender || null;
      const receiverId = msg.receiverId || msg.ReceiverId || msg.receiver || null;
      const text = msg.text || msg.Text || msg.message || "";
      const timestamp =
        msg.timestampUtc ||
        msg.TimestampUtc ||
        msg.timestamp ||
        new Date().toISOString();
      const isRead =
        typeof msg.isRead !== "undefined" ? msg.isRead : msg.IsRead || false;

      const isMySender =
        String(senderId).toLowerCase() === String(myUserId).toLowerCase();

      return {
        id,
        sender: isMySender ? "current" : "partner",
        senderId,
        receiverId,
        text,
        timestamp: new Date(timestamp),
        read: !!isRead,
        raw: msg,
      };
    },
    [myUserId],
  );

  const fetchHistory = useCallback(
    async ({ sessionId = null, withUserId = null } = {}) => {
      try {
        setIsLoadingHistory(true);
        const token = getToken();
        let url = `${config.VITE_BACKEND_URL}/api/chat/history`;
        if (sessionId) url += `?sessionId=${encodeURIComponent(sessionId)}`;
        else if (withUserId)
          url += `?withUserId=${encodeURIComponent(withUserId)}`;

        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error(`History request failed: ${res.status}`, errorText);
          throw new Error(`History request failed: ${res.status}`);
        }

        const data = await res.json();

        // Handle both { data: [...] } and plain [...] response shapes
        const raw = Array.isArray(data) ? data : data?.data ?? [];
        const mapped = raw.map(mapServerMessage).filter(Boolean);
        setMessages(mapped);
      } catch (err) {
        console.error("Failed to fetch chat history", err);
        setMessages([]);
      } finally {
        setIsLoadingHistory(false);
      }
    },
    [getToken, mapServerMessage],
  );

  const handleReceiveMessage = useCallback(
    (msg) => {
      const mapped = mapServerMessage(msg);
      if (!mapped) return;

      const msgSenderId = String(msg.senderId || msg.SenderId || "").toLowerCase();
      const msgReceiverId = String(msg.receiverId || msg.ReceiverId || "").toLowerCase();
      const myUserIdLower = String(myUserId).toLowerCase();
      const chatPartnerIdLower = String(chatPartner?.id || "").toLowerCase();

      const isRelevantMessage = currentSessionId
        ? String(
            msg.skillExchangeSessionId || msg.SkillExchangeSessionId || "",
          ).toLowerCase() === String(currentSessionId).toLowerCase()
        : (msgSenderId === chatPartnerIdLower && msgReceiverId === myUserIdLower) ||
          (msgSenderId === myUserIdLower && msgReceiverId === chatPartnerIdLower);

      if (isRelevantMessage) {
        setMessages((prev) => {
          const msgId = String(mapped.id).toLowerCase();
          const exists = prev.some(
            (m) =>
              String(m.id).toLowerCase() === msgId ||
              (m.raw?.id && String(m.raw.id).toLowerCase() === msgId),
          );
          if (exists) return prev;
          return [...prev, mapped];
        });
      }
    },
    [currentSessionId, chatPartner?.id, myUserId, mapServerMessage],
  );

  const handleMessageSent = useCallback(
    (msg) => {
      const mapped = mapServerMessage(msg);
      if (!mapped) return;

      setMessages((prev) => {
        let replaced = false;
        const updated = prev.map((m) => {
          if (!replaced && m.isPending && m.text === mapped.text) {
            replaced = true;
            return mapped;
          }
          return m;
        });
        return updated;
      });
    },
    [mapServerMessage],
  );

  const handleConnected = useCallback(() => {}, []);
  const handleDisconnected = useCallback(() => {}, []);

  const handleReconnected = useCallback(
    async () => {
      try {
        if (currentSessionId) {
          await fetchHistory({ sessionId: currentSessionId });
        } else if (chatPartner?.id) {
          await fetchHistory({ withUserId: chatPartner.id });
        }
      } catch (err) {
        console.error("Failed to refetch history on reconnect:", err);
      }
    },
    [currentSessionId, chatPartner?.id, fetchHistory],
  );

  const signalRHandlers = useMemo(
    () => ({
      onReceiveMessage: handleReceiveMessage,
      onMessageSent: handleMessageSent,
      onConnected: handleConnected,
      onDisconnected: handleDisconnected,
      onReconnected: handleReconnected,
    }),
    [
      handleReceiveMessage,
      handleMessageSent,
      handleConnected,
      handleDisconnected,
      handleReconnected,
    ],
  );

  const {
    start,
    stop,
    sendMessage: signalrSendMessage,
    joinSession,
    markAsRead,
    connectionState,
  } = useSignalR({
    hubUrl: config.VITE_SIGNALR_HUB_URL,
    getAccessToken: getToken,
    handlers: signalRHandlers,
  });

  /**
   * FIX: Added `isAuthReady` as a dependency.
   * The effect will NOT run until both the drawer is open AND the auth token
   * is confirmed to exist. This stops the race condition where the component
   * mounts and immediately tries to negotiate SignalR before Redux/localStorage
   * has finished restoring the token.
   */
  useEffect(() => {
    if (!open || !chatPartner?.id || !isAuthReady) return;

    let mounted = true;

    (async () => {
      try {
        await start();
        if (!mounted) return;

        if (currentSessionId) {
          await joinSession(currentSessionId);
        }

        if (currentSessionId) {
          await fetchHistory({ sessionId: currentSessionId });
        } else {
          await fetchHistory({ withUserId: chatPartner.id });
        }
      } catch (err) {
        if (!mounted) return;
        console.error("SignalR setup error:", err);
        if (
          err.message?.includes("401") ||
          err.message?.includes("Unauthorized")
        ) {
          console.error("Authentication failed. Please login again.");
        }
      }
    })();

    return () => {
      mounted = false;
      stop?.();
    };
  }, [
    open,
    chatPartner?.id,
    currentSessionId,
    isAuthReady, // KEY FIX: re-run if/when auth becomes available
    start,
    stop,
    joinSession,
    fetchHistory,
  ]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(
    (e) => {
      e?.preventDefault();
      if (!newMessage.trim()) return;

      const text = newMessage.trim();
      const token = getToken();

      if (!token) {
        alert("You must be logged in to send messages. Please login first.");
        return;
      }

      if (connectionState !== "connected") {
        alert(
          `Cannot send message: Connection is ${connectionState}. Please wait for connection to establish.`,
        );
        return;
      }

      const optimisticId = `temp-${Date.now()}-${Math.random()}`;
      const optimistic = {
        id: optimisticId,
        sender: "current",
        senderId: myUserId,
        receiverId: chatPartner.id,
        text,
        timestamp: new Date(),
        read: false,
        isPending: true,
      };
      setMessages((prev) => [...prev, optimistic]);
      setNewMessage("");
      inputRef.current?.focus();

      (async () => {
        try {
          await signalrSendMessage(chatPartner.id, text, currentSessionId);
        } catch (err) {
          console.error("Send failed:", err);
          setMessages((prev) => prev.filter((m) => m.id !== optimisticId));

          if (
            err.message?.includes("401") ||
            err.message?.includes("Unauthorized")
          ) {
            alert("Authentication failed. Please login again.");
          } else if (err.message?.includes("connection not started")) {
            alert("Connection lost. Please try again in a moment.");
          } else {
            alert(`Failed to send message: ${err.message || "Unknown error"}`);
          }
        }
      })();
    },
    [
      newMessage,
      getToken,
      chatPartner?.id,
      currentSessionId,
      myUserId,
      signalrSendMessage,
      connectionState,
    ],
  );

  // Mark unread messages as read
  useEffect(() => {
    if (!markAsRead || messages.length === 0) return;

    (async () => {
      try {
        const unreadIds = messages
          .filter(
            (m) =>
              m.raw &&
              (m.raw.receiverId === myUserId || m.raw.ReceiverId === myUserId) &&
              !m.read,
          )
          .map((m) => m.id || m.raw.id || m.raw.Id)
          .filter(Boolean);

        if (unreadIds.length > 0) {
          await markAsRead(unreadIds);
          setMessages((prev) =>
            prev.map((m) =>
              unreadIds.includes(m.id) ? { ...m, read: true } : m,
            ),
          );
        }
      } catch {
        // silently ignore
      }
    })();
  }, [messages, markAsRead, myUserId]);

  const handleSendTradeRequest = useCallback(() => {
    if (!tradeForm.skillOffering || !tradeForm.skillRequesting) {
      alert("Please select both skills");
      return;
    }

    const tradeMessage = {
      id: `trade-${Date.now()}`,
      sender: "current",
      text: `📋 Trade Request: I'm offering "${tradeForm.skillOffering}" in exchange for "${tradeForm.skillRequesting}". ${
        tradeForm.message ? `Message: ${tradeForm.message}` : ""
      }`,
      timestamp: new Date(),
      read: false,
      isTradeRequest: true,
    };

    setMessages((prev) => [...prev, tradeMessage]);
    setIsTradeModalOpen(false);
    setTradeForm({ skillOffering: "", skillRequesting: "", message: "" });
    inputRef.current?.focus();
  }, [tradeForm]);

  if (!chatPartner) return null;

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: isMobile ? "100vw" : "70vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        {/* Header */}
        <AppBar
          position="sticky"
          color="default"
          elevation={1}
          sx={{ bgcolor: "background.paper" }}
        >
          <Paper variant="outlined" square sx={{ p: 2, borderRadius: 0 }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <IconButton edge="start" onClick={toggleDrawer(false)}>
                <ArrowBackIcon />
              </IconButton>
              <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.light" }}>
                {getInitials(chatPartner.name)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {chatPartner.name}
                  </Typography>
                  <Chip label={`★ ${chatPartner.rating}`} size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  📍 {chatPartner.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {chatPartner.completedTrades} trades completed
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsTradeModalOpen(true)}
                startIcon={<EmojiEmotionsIcon />}
              >
                Request Trade
              </Button>
            </Box>
          </Paper>
        </AppBar>

        {/* Debug Panel (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <Paper sx={{ m: 1, p: 1, bgcolor: "grey.100" }}>
            <Typography variant="caption" display="block">
              {connectionState} | Messages: {messages.length} | Auth:{" "}
              {isAuthReady ? "Ready" : "Waiting..."}
            </Typography>
          </Paper>
        )}

        {/* Messages area */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {/* Show a waiting state if auth isn't ready yet */}
          {!isAuthReady ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Authenticating...
              </Typography>
            </Box>
          ) : isLoadingHistory ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Loading chat history...
              </Typography>
            </Box>
          ) : messages.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No messages yet. Start a conversation!
              </Typography>
            </Box>
          ) : (
            <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {messages.map((message) => {
                const isCurrent = message.sender === "current";
                return (
                  <ListItem
                    key={message.id}
                    sx={{
                      display: "flex",
                      justifyContent: isCurrent ? "flex-end" : "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        width: "auto",
                        maxWidth: { xs: "85%", sm: "70%", md: 600 },
                      }}
                    >
                      <Paper
                        sx={{
                          display: "inline-block",
                          p: 1.5,
                          bgcolor: isCurrent ? "primary.main" : "grey.100",
                          color: isCurrent
                            ? "primary.contrastText"
                            : "text.primary",
                          wordBreak: "break-word",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {message.text}
                        </Typography>
                      </Paper>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          mt: 0.5,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(message.timestamp)}
                        </Typography>
                        {isCurrent && (
                          <Typography variant="caption" color="text.secondary">
                            {message.read ? "✓✓" : "✓"}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </ListItem>
                );
              })}
              <div ref={messagesEndRef} />
            </List>
          )}
        </Box>

        {/* Input */}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          {connectionState !== "connected" && (
            <Box sx={{ mb: 1 }}>
              <Chip
                label={
                  connectionState === "connecting" ||
                  connectionState === "reconnecting"
                    ? "Connecting to chat..."
                    : connectionState === "error"
                      ? "Connection error - retrying..."
                      : !isAuthReady
                        ? "Authenticating..."
                        : "Disconnected"
                }
                size="small"
                color={
                  connectionState === "connecting" ||
                  connectionState === "reconnecting"
                    ? "warning"
                    : "error"
                }
                sx={{ fontSize: "0.75rem" }}
              />
            </Box>
          )}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={() => alert("Emoji picker - coming soon")}>
              <EmojiEmotionsIcon />
            </IconButton>
            <TextField
              inputRef={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder={
                connectionState === "connected"
                  ? "Type your message..."
                  : "Connecting to chat..."
              }
              variant="outlined"
              size="small"
              fullWidth
              autoComplete="off"
              spellCheck="true"
              disabled={connectionState !== "connected"}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!newMessage.trim() || connectionState !== "connected"}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Stack>
        </Box>

        {/* Trade Dialog */}
        <Dialog
          open={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Request Trade</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Formalize your skill exchange with {chatPartner.name}
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Skill I'm Offering</InputLabel>
              <Select
                value={tradeForm.skillOffering}
                label="Skill I'm Offering"
                onChange={(e) =>
                  setTradeForm((s) => ({ ...s, skillOffering: e.target.value }))
                }
              >
                <MenuItem value="">Select a skill</MenuItem>
                <MenuItem value="Web Development">Web Development</MenuItem>
                <MenuItem value="Graphic Design">Graphic Design</MenuItem>
                <MenuItem value="Photography">Photography</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Skill I Want</InputLabel>
              <Select
                value={tradeForm.skillRequesting}
                label="Skill I Want"
                onChange={(e) =>
                  setTradeForm((s) => ({
                    ...s,
                    skillRequesting: e.target.value,
                  }))
                }
              >
                <MenuItem value="">Select a skill</MenuItem>
                {chatPartner.skillsOffered.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    {skill}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Describe the scope or timeline..."
              value={tradeForm.message}
              onChange={(e) =>
                setTradeForm((s) => ({
                  ...s,
                  message: e.target.value.slice(0, 200),
                }))
              }
              sx={{ mb: 1 }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "right" }}
            >
              {tradeForm.message.length}/200
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsTradeModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSendTradeRequest}>
              Send Request
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Drawer>
  );
}