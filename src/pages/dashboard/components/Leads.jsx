import { Chat, Handshake, LocationOn } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatHistoryAction } from '../../../common/state/CommonActions';

const Leads = ({ toggleDrawer }) => {
  const dispatch = useDispatch();
  const { getChatHistory, getChatHistoryResp } = useSelector((state) => state.CommonReducer);

  useEffect(() => {
    // Fetch chat history when component mounts
    dispatch(getChatHistoryAction());
  }, [dispatch]);

  const leads = getChatHistoryResp || [];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          My Leads
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {getChatHistory ? "Loading..." : `${leads.length} users`}
        </Typography>
      </Box>

      {getChatHistory ? (
        <Card elevation={3}>
          <CardContent sx={{ py: 6, textAlign: "center" }}>
            <CircularProgress sx={{ mb: 2 }} size={48} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Loading your leads...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we fetch your chat history
            </Typography>
          </CardContent>
        </Card>
      ) : leads.length === 0 ? (
        <Card elevation={3}>
          <CardContent sx={{ py: 6, textAlign: "center" }}>
            <Chat
              sx={{
                fontSize: "3rem",
                color: "text.secondary",
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              No leads yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start chatting with users to build your leads
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {leads.map((user) => (
            <Card
              key={user?.userId}
              elevation={2}
              sx={{
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                  }}
                >
                  {/* User Avatar & Info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      flex: 1,
                      height: 100,
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        border: "2px solid",
                        borderColor: "primary.light",
                      }}
                    >
                      {user?.fullName
                        ? user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : "??"}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {user?.fullName}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mb: 1,
                        }}
                      >
                        <LocationOn
                          sx={{
                            fontSize: "0.875rem",
                            color: "text.secondary",
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {user?.county}, {user?.country}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Skills */}
                  <Box sx={{ flex: 1 }}>
                    <Stack spacing={2}>
                      {user.skills && user.skills.length > 0 && (
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 1, display: "block" }}
                          >
                            Skills Offered
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {user.skills.map((skill, index) => (
                              <Box
                                key={index}
                                sx={{
                                  backgroundColor: "primary.main2",
                                  color: "primary.dark",
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: "12px",
                                  fontSize: "0.7rem",
                                  fontWeight: 500,
                                }}
                              >
                                {skill}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  </Box>

                  {/* Actions */}
                  <Stack
                    direction={{ xs: "column", md: "column" }}
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Handshake />}
                      onClick={() => {
                        /* request trade logic */
                      }}
                      sx={{
                        width: "100%",
                        textTransform: "none",
                      }}
                    >
                      Request Trade
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Chat />}
                      onClick={toggleDrawer(true, user)}
                      sx={{
                        width: "100%",
                        textTransform: "none",
                      }}
                    >
                      Message
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Leads;
