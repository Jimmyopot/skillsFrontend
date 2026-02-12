import { Chat, Handshake, LocationOn, People, StarBorder } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CircularProgress, Stack, Typography, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react'
import Leads from './Leads';
import RatingDialog from './RatingDialog';

const Suggestedmatches = ({ searchResultsRef,
    searchQuery,
    selectedCounty,
    searchUsersBySkillAndCounty,
    filteredUsers, handleClearSearch,
    toggleDrawer }) => {
  
  const [tabValue, setTabValue] = useState(0);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedUserForRating, setSelectedUserForRating] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenRatingDialog = (user) => {
    setSelectedUserForRating(user);
    setRatingDialogOpen(true);
  };

  const handleCloseRatingDialog = () => {
    setRatingDialogOpen(false);
    setSelectedUserForRating(null);
  };

  return (
    <Box ref={searchResultsRef}>
      {/* Tabs */}
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", mb: 3, mx: 0, mt: 0 }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="matches tabs"
          sx={{
            "& .MuiTabs-indicator": {
              height: 3,
            },
          }}
        >
          <Tab
            label="Suggested Matches"
            sx={{ textTransform: "none", fontWeight: 600 }}
          />
          <Tab
            label="My Leads"
            sx={{ textTransform: "none", fontWeight: 600 }}
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {searchQuery || selectedCounty !== "All Counties"
                ? "Search Results"
                : "Suggested Matches"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchUsersBySkillAndCounty
                ? "Searching..."
                : `${filteredUsers.length} users found`}
            </Typography>
          </Box>

          {searchUsersBySkillAndCounty ? (
            <Card elevation={0}>
              <CardContent sx={{ py: 6, textAlign: "center" }}>
                <CircularProgress sx={{ mb: 2 }} size={48} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Searching for users...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please wait while we find matches for you
                </Typography>
              </CardContent>
            </Card>
          ) : filteredUsers.length === 0 ? (
            <Card elevation={0}>
              <CardContent sx={{ py: 6, textAlign: "center" }}>
                <People
                  sx={{
                    fontSize: "3rem",
                    color: "text.secondary",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  No matches found
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Try adjusting your search criteria or location filter
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleClearSearch();
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Stack spacing={2}>
              {filteredUsers.map((user) => (
                <Card
                  key={user?.userId || user?.id}
                  elevation={0}
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
                        // gap: 3,
                      }}
                    >
                      {/* User Avatar & Info */}
                      {/* <Box sx={{ display: "flex", gap: 2, flex: 1, height: 130 }}> */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 2,
                          // flex: 1,
                          width: { xs: "100%", md: "40%" },
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
                            ? user?.fullName
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
                              {user?.cityOrTown || user?.county},{" "}
                              {user?.country || "Kenya"}
                            </Typography>
                          </Box>
                          {/* <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          fontSize: "0.875rem",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          📩 {user?.email || user?.contact}
                        </Typography>
                      </Box> */}
                        </Box>
                      </Box>

                      {/* Skills */}
                      <Box
                        sx={{
                          width: { xs: "100%", md: "60%" },
                        }}
                      >
                        <Stack spacing={2}>
                          {/* Optional: Skills Offered */}
                          {user.skillsOffered && (
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
                                {user?.skillsOffered.map((skill, index) => (
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

                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<Chat />}
                            onClick={toggleDrawer(true, user)}
                            sx={{
                              // width: "100%",
                              // width: { xs: "100%", md: 140 }, // full width on mobile, fixed on desktop
                              // height: 72,
                              textTransform: "none",
                            }}
                          >
                            Message
                          </Button>

                          <Button
                            variant="outlined"
                            size=""
                            onClick={() => handleOpenRatingDialog(user)}
                            sx={{
                              textTransform: "none",
                              borderColor: "gray",
                              color: "text.secondary",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              "&:hover": {
                                borderColor: "#FFB300",
                                color: "#FFB300",
                                "& .MuiSvgIcon-root": {
                                  color: "#FFB300",
                                },
                              },
                            }}
                          >
                            <StarBorder sx={{ fontSize: "1rem" }} />
                            Rate
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </>
      ) : (
        <Leads toggleDrawer={toggleDrawer} />
      )}

      {/* Rating Dialog */}
      <RatingDialog
        open={ratingDialogOpen}
        onClose={handleCloseRatingDialog}
        user={selectedUserForRating}
      />
    </Box>
  );
}

export default Suggestedmatches
