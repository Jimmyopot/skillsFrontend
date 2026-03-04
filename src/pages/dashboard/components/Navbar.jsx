import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Badge,
  Button,
  Chip,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Handshake as HandshakeIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Chat as ChatIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { useSnackbar } from "../../../common/snackbar/SnackbarContext";
import { logout } from "../../../pages/login/state/authSlice";
import {
  getNotificationsAction,
  markNotificationAsReadAction,
} from "../state/DashboardActions";
import { setSelectedChatFromNotification } from "../state/DashboardSlice";
import useSignalR from "../../../services/useSignalR";
import { config } from "../../../utils/config";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const { notifications, unreadCount } = useSelector(
    (state) => state.DashboardReducer
  );
  const { showSnackbar } = useSnackbar();

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [theme, setTheme] = useState("light");

  const isDropdownOpen = Boolean(anchorEl);
  const isNotificationsOpen = Boolean(notificationsAnchorEl);

  const currentUser = user || {
    fullName: "John Doe",
    email: "john.doe@example.com",
    profilePicture: null,
  };

  // Fetch notifications on component mount
  useEffect(() => {
    const userId = user?.userId || user?.id;
    if (userId) {
      dispatch(getNotificationsAction(userId));
    }
  }, [dispatch, user?.userId, user?.id]);

  // Get token for SignalR authentication
  const getToken = useCallback(() => {
    return localStorage.getItem("authToken");
  }, []);

  // Handle new notification from SignalR
  const handleNewNotification = useCallback(
    (notification) => {
      console.log("New notification received:", notification);
      
      // Refresh notifications from API to get updated list
      const userId = user?.userId || user?.id;
      if (userId) {
        dispatch(getNotificationsAction(userId));
      }
      
      // Show a snackbar notification
      showSnackbar(`New message from ${notification.senderName || 'someone'}`, "info");
    },
    [dispatch, user?.userId, user?.id, showSnackbar]
  );

  // Handle unread count update from SignalR
  const handleUnreadCountUpdate = useCallback(
    (count) => {
      console.log("Unread count updated:", count);
      // The count will be updated when we refetch notifications
      // Or you could dispatch a specific Redux action to update just the count
    },
    []
  );

  // SignalR handlers
  const signalRHandlers = useMemo(
    () => ({
      onNewNotification: handleNewNotification,
      onUnreadCountUpdate: handleUnreadCountUpdate,
      onConnected: () => console.log("Notification SignalR connected"),
      onDisconnected: () => console.log("Notification SignalR disconnected"),
      onReconnected: () => {
        console.log("Notification SignalR reconnected");
        // Refetch notifications on reconnect
        const userId = user?.userId || user?.id;
        if (userId) {
          dispatch(getNotificationsAction(userId));
        }
      },
    }),
    [handleNewNotification, handleUnreadCountUpdate, dispatch, user?.userId, user?.id]
  );

  // Initialize SignalR connection for notifications
  const { start: startNotificationHub, stop: stopNotificationHub } = useSignalR({
    hubUrl: `${config.VITE_BACKEND_URL}/hubs/notifications`,
    getAccessToken: getToken,
    handlers: signalRHandlers,
  });

  // Connect to notification hub when component mounts
  useEffect(() => {
    const userId = user?.userId || user?.id;
    if (!userId) return;

    console.log("Starting notification SignalR connection...");
    startNotificationHub();

    return () => {
      console.log("Stopping notification SignalR connection...");
      stopNotificationHub();
    };
  }, [startNotificationHub, stopNotificationHub, user?.userId, user?.id]);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleNotificationClick = async (notification) => {
    try {
      // Mark notification as read via API
      await dispatch(markNotificationAsReadAction(notification.notificationId)).unwrap();

      // Navigate to the specific chat
      if (notification.notificationType === "chat" && notification.chatId) {
        // Store the chatId in Redux so Dashboard can react to it
        dispatch(
          setSelectedChatFromNotification({
            chatId: notification.chatId,
            senderId: notification.senderId,
          })
        );
      }

      handleNotificationsClose();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      showSnackbar("Failed to open notification", "error");
    }
  };

  const getUnreadCount = () => {
    return unreadCount || 0;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return "NOW";
    if (diffInMins < 60) return `${diffInMins}M`;
    if (diffInHours < 24) return `${diffInHours}HR`;
    if (diffInDays < 365) return `${diffInDays}DY`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getSenderName = (messagePreview) => {
    // Extract sender name from "Name: message" format
    const colonIndex = messagePreview.indexOf(":");
    if (colonIndex !== -1) {
      return messagePreview.substring(0, colonIndex).trim();
    }
    return "User";
  };

  const getMessageContent = (messagePreview) => {
    // Extract message content after sender name
    const colonIndex = messagePreview.indexOf(":");
    if (colonIndex !== -1) {
      return messagePreview.substring(colonIndex + 1).trim();
    }
    return messagePreview;
  };

  const getNotificationTitle = (notification) => {
    const senderName = getSenderName(notification.messagePreview);
    switch (notification.notificationType) {
      case "chat":
        return senderName;
      default:
        return senderName;
    }
  };

  const getNotificationDescription = (notification) => {
    const messageContent = getMessageContent(notification.messagePreview);
    switch (notification.notificationType) {
      case "chat":
        return messageContent;
      default:
        return messageContent;
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // ✅ Handle logout using authSlice logout action
  const handleLogout = () => {
    handleDropdownClose(); // Close the dropdown immediately

    // Dispatch logout action (clears Redux state and localStorage)
    dispatch(logout());
    navigate("/#/login");

    // Show success message
    showSnackbar("Logout successful!", "success");

    // Navigate to login page
    setTimeout(() => {
      // navigate("/login");
    }, 300);
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: "primary.main2",
        backdropFilter: "blur(8px)",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 4 }, py: 0 }}>
        {/* Logo Section */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
        >
          <Button
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "none",
              color: "text.primary",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <Box
              sx={{
                p: 1,
                backgroundColor: "primary.main",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HandshakeIcon
                sx={{ fontSize: 20, color: "primary.contrastText" }}
              />
            </Box>
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              NipeNikupe
            </Typography>
          </Button>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notifications */}
          <IconButton
            size="large"
            sx={{ color: "text.primary" }}
            onClick={handleNotificationsClick}
            aria-label={`${getUnreadCount()} unread notifications`}
            aria-expanded={isNotificationsOpen}
            aria-haspopup="true"
          >
            <Badge badgeContent={getUnreadCount()} color="error">
              <NotificationsIcon sx={{ color: "primary.main" }} />
            </Badge>
          </IconButton>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notificationsAnchorEl}
            open={isNotificationsOpen}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: {
                width: 380,
                maxWidth: "calc(100vw - 32px)",
                mt: 1,
                maxHeight: 480,
                boxShadow: 3,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {/* Header */}
            <Box
              sx={{
                px: 2.5,
                py: 2,
                borderBottom: 1,
                borderColor: "divider",
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "background.paper",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight="600" sx={{ fontSize: "1rem" }}>
                  Notifications
                </Typography>
                {getUnreadCount() > 0 && (
                  <Chip
                    label={`${getUnreadCount()} new`}
                    size="small"
                    color="primary"
                    sx={{
                      height: 20,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>
            </Box>

            {/* Notifications List */}
            {notifications.length === 0 ? (
              <Box
                sx={{
                  py: 6,
                  px: 3,
                  textAlign: "center",
                }}
              >
                <NotificationsIcon
                  sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  No notifications yet
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: 400, overflow: "auto" }}>
                {notifications.map((notification) => (
                  <Box
                    key={notification.notificationId}
                    onClick={() => handleNotificationClick(notification)}
                    sx={{
                      py: 2,
                      px: 2.5,
                      display: "flex",
                      gap: 2,
                      cursor: "pointer",
                      backgroundColor: notification.isRead
                        ? "transparent"
                        : "rgba(25, 118, 210, 0.04)",
                      transition: "background-color 0.2s",
                      "&:hover": {
                        backgroundColor: notification.isRead
                          ? "action.hover"
                          : "rgba(25, 118, 210, 0.08)",
                      },
                      borderBottom: 1,
                      borderColor: "divider",
                      "&:last-child": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    {/* Avatar with Blue Dot Indicator */}
                    <Box sx={{ position: "relative", flexShrink: 0 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          // bgcolor: notification.notificationType === "chat"
                          //   ? "primary.main"
                          //   : "secondary.main",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                        }}
                      >
                        {getInitials(getSenderName(notification.messagePreview))}
                      </Avatar>
                      {!notification.isRead && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: -3,
                            width: 10,
                            height: 10,
                            bgcolor: "red",
                            borderRadius: "50%",
                            border: 2,
                            borderColor: "background.paper",
                          }}
                        />
                      )}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      {/* Header: Name and Timestamp */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                          }}
                        >
                          {getNotificationTitle(notification)}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            flexShrink: 0,
                            fontSize: "0.75rem",
                          }}
                        >
                          {formatTimestamp(notification.timestamp)}
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.875rem",
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {getNotificationDescription(notification)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            {/* Footer */}
            {notifications.length > 0 && getUnreadCount() > 0 && (
              <Box
                sx={{
                  borderTop: 1,
                  borderColor: "divider",
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: "background.paper",
                  p: 1.5,
                }}
              >
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    textTransform: "none",
                    color: "primary.main",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    py: 1,
                  }}
                  onClick={async () => {
                    // Mark all unread notifications as read
                    const unreadNotifications = notifications.filter((n) => !n.isRead);
                    try {
                      await Promise.all(
                        unreadNotifications.map((notif) =>
                          dispatch(markNotificationAsReadAction(notif.notificationId))
                        )
                      );
                      showSnackbar("All notifications marked as read", "success");
                    } catch (error) {
                      console.error("Failed to mark all as read:", error);
                      showSnackbar("Failed to mark all as read", "error");
                    }
                  }}
                >
                  Mark all as read
                </Button>
              </Box>
            )}
          </Menu>

          {/* User Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleDropdownClick}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textTransform: "none",
                borderRadius: "50px",
                px: 1,
                py: 0.5,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <Avatar
                src={currentUser.profilePicture || "/placeholder.svg"}
                alt={currentUser.fullName}
                sx={{
                  width: 36,
                  height: 36,
                  border: 2,
                  borderColor: "primary.main",
                  borderOpacity: 0.2,
                }}
              >
                {getInitials(currentUser.fullName)}
              </Avatar>
              <ExpandMoreIcon
                sx={{
                  fontSize: 16,
                  color: "text.secondary",
                  transition: "transform 0.2s",
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Button>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={isDropdownOpen}
              onClose={handleDropdownClose}
              PaperProps={{
                sx: {
                  width: 300,
                  mt: 1,
                  boxShadow: 3,
                  "& .MuiMenuItem-root": {
                    px: 2,
                    py: 1.5,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* User Info */}
              <Box
                sx={{
                  px: 2,
                  py: 2,
                  borderBottom: 1,
                  borderColor: "divider",
                  backgroundColor: "grey.50",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={currentUser.profilePicture || "/placeholder.svg"}
                    alt={currentUser.fullName}
                    sx={{
                      width: 48,
                      height: 48,
                      border: 2,
                      borderColor: "primary.main",
                      borderOpacity: 0.2,
                    }}
                  >
                    {getInitials(currentUser.fullName)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight="600" noWrap>
                      Hi, {currentUser.fullName.split(" ")[0]}! 👋
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {currentUser.email}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          backgroundColor: "success.main",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Online
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Menu Items */}
              {/* <MenuItem onClick={handleDropdownClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Update Profile" />
              </MenuItem>

              <MenuItem onClick={handleDropdownClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Account Settings" />
              </MenuItem>

              <MenuItem onClick={handleDropdownClose}>
                <ListItemIcon>
                  <HelpIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Help & Support" />
              </MenuItem> */}

              <Divider />

              {/* Theme Toggle */}
              <MenuItem onClick={toggleTheme}>
                <ListItemIcon>
                  {theme === "light" ? (
                    <DarkModeIcon fontSize="small" />
                  ) : (
                    <LightModeIcon fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText primary="Theme" />
                <Chip
                  label={theme}
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: "capitalize", ml: 1 }}
                />
              </MenuItem>

              <Divider />

              {/* Logout */}
              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
