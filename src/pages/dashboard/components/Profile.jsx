import { Avatar, Box, Button, Card, CardContent, Chip, Divider, Stack, Typography, CircularProgress } from '@mui/material';
import {
  LocationOn,
  Edit,
  Email,
  Phone,
  Star,
  Handshake,
  People,
  TrendingUp,
  History,
} from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';
import stringAvatar from '../../../common/StringAvatar';
import { useState, useEffect } from 'react';
import UpdateProfilePopup from './UpdateProfilePopup';
import { getRecentSearchedSkillsAction } from '../../../common/state/CommonActions';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

    const { user } = useSelector((state) => state.AuthReducer);
    const { getRecentSearchedSkills, getRecentSearchedSkillsResp } = useSelector((state) => state.CommonReducer);

    useEffect(() => {
      // Fetch recent searched skills when component mounts
      dispatch(getRecentSearchedSkillsAction());
    }, [dispatch]);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Stack spacing={3}>
        {/* Profile Card */}
        <Card elevation={0}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">My Profile</Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<Edit sx={{ fontSize: "1rem" }} />}
              sx={{ minWidth: "auto", px: 1 }}
              onClick={handleClickOpen}
            >
              Edit
            </Button>
          </Box>
          <CardContent sx={{ pt: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                // src={currentUser.profilePicture || "/placeholder.svg"}
                src=""
                alt={user?.fullName}
                {...stringAvatar(user?.fullName)}
                sx={{
                  width: 96,
                  height: 96,
                  mb: 2,
                  border: "4px solid",
                  borderColor: "primary.light",
                  fontSize: "1.5rem",
                }}
              >
                {/* {stringAvatar("user?.fullName")} */}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {user?.fullName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.5,
                }}
              >
                <LocationOn
                  sx={{ fontSize: "0.875rem", color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {user?.country},{" "}
                  {user?.country === "Kenya"
                    ? user?.cityOrTown
                    : user?.localityOrArea}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ pt: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <Email
                    sx={{
                      fontSize: "1rem",
                      color: "text.secondary",
                      mt: 0.5,
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <Phone
                    sx={{
                      fontSize: "1rem",
                      color: "text.secondary",
                      mt: 0.5,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body2">{user?.phoneNumber}</Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>

            {/* Availability Section */}
            {(user?.availableDate || user?.availableTime) && (
              <Box sx={{ pt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <TrendingUp
                    sx={{ fontSize: "1rem", color: "success.main" }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Availability
                  </Typography>
                </Box>
                <Stack spacing={1}>
                  {user?.availableDate && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ minWidth: 60 }}
                      >
                        📅 Date:
                      </Typography>
                      <Typography variant="body2">
                        {new Date(user.availableDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                    </Box>
                  )}
                  {user?.availableTime && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ minWidth: 60 }}
                      >
                        🕐 Time:
                      </Typography>
                      <Typography variant="body2">
                        {user.availableTime.substring(0, 5)}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}

            <Box sx={{ pt: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Star sx={{ fontSize: "1rem", color: "primary.main" }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Skills I Offer
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {user?.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      bgcolor: "primary.main2",
                      color: "primary.dark",
                      "& .MuiChip-label": { fontWeight: 500 },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Recent Searched Skills */}
            <Box sx={{ pt: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <History sx={{ fontSize: "1rem", color: "secondary.main" }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Recent Searched Skills
                </Typography>
              </Box>
              {getRecentSearchedSkills ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : getRecentSearchedSkillsResp?.recentSearches?.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {getRecentSearchedSkillsResp.recentSearches.map(
                    (item, index) => (
                      <Chip
                        key={index}
                        label={item.skill}
                        icon={
                          <History sx={{ fontSize: "0.875rem !important" }} />
                        }
                        size="small"
                        sx={{
                          bgcolor: "#ffffff",
                          border: 1,
                          borderColor: "secondary.main",
                          color: "secondary.dark",
                          "& .MuiChip-label": { fontWeight: 500 },
                        }}
                      />
                    )
                  )}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No recent searches yet
                </Typography>
              )}
              {/* {getRecentSearchedSkillsResp?.count > 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                  {getRecentSearchedSkillsResp.message}
                </Typography>
              )} */}
            </Box>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card elevation={3}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Quick Stats</Typography>
          </Box>
          <CardContent sx={{ pt: 0 }}>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TrendingUp
                    sx={{ fontSize: "1rem", color: "primary.main" }}
                  />
                  <Typography variant="body2">Active Trades</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  0
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <People sx={{ fontSize: "1rem", color: "primary.main" }} />
                  <Typography variant="body2">Completed</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  0
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Star sx={{ fontSize: "1rem", color: "primary.main" }} />
                  <Typography variant="body2">Rating</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  0.0
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <UpdateProfilePopup open={open} handleClose={handleClose} />
      </Stack>
    );
}

export default Profile
