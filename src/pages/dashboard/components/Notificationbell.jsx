import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Badge,
  IconButton,
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useNotifications from "../../../services/useSignalR";
import { config } from "../../../utils/config";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationBell() {
  const authState = useSelector((state) => state.LoginReducer);

  const getToken = useCallback(
    () => authState.token || localStorage.getItem("authToken") || null,
    [authState.token],
  );

  const isLoggedIn = Boolean(getToken());

  const { notifications, unreadCount, markOneRead, markAllRead } =
    useNotifications({
      hubUrl: config.VITE_SIGNALR_NOTIFICATIONS_HUB_URL, // e.g. "https://api.nipenikupe.top/hubs/notifications"
      getAccessToken: getToken,
      enabled: isLoggedIn,
    });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const handleMarkAllRead = async () => {
    markAllRead();
    // Also call the REST endpoint so the DB is updated
    try {
      await fetch(
        `${config.VITE_BACKEND_URL}/api/notifications/mark-all-read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        },
      );
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleMarkOneRead = async (notificationId) => {
    markOneRead(notificationId);
    try {
      await fetch(
        `${config.VITE_BACKEND_URL}/api/notifications/${notificationId}/mark-read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        },
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
        aria-label="Notifications"
      >
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { width: 360, maxHeight: 480 } }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={handleMarkAllRead}>
              Mark all read
            </Button>
          )}
        </Box>

        {/* List */}
        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No notifications yet
            </Typography>
          </Box>
        ) : (
          <List disablePadding sx={{ overflowY: "auto", maxHeight: 380 }}>
            {notifications.map((n, idx) => (
              <Box key={n.notificationId ?? idx}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() =>
                    !n.isRead && handleMarkOneRead(n.notificationId)
                  }
                  sx={{
                    cursor: n.isRead ? "default" : "pointer",
                    bgcolor: n.isRead ? "transparent" : "action.hover",
                    "&:hover": { bgcolor: "action.selected" },
                    gap: 1,
                  }}
                >
                  {!n.isRead && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        fontWeight={n.isRead ? 400 : 600}
                      >
                        {n.messagePreview}
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: 0.5,
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {timeAgo(n.timestamp)}
                        </Typography>
                        {n.notificationType && (
                          <Chip
                            label={n.notificationType}
                            size="small"
                            sx={{ height: 16, fontSize: "0.65rem" }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {idx < notifications.length - 1 && <Divider component="li" />}
              </Box>
            ))}
          </List>
        )}
      </Popover>
    </>
  );
}
