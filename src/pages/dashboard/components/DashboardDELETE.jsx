/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  Container,
  Divider,
  Stack,
  Paper,
  Fade,
  IconButton,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import {
  Search,
  LocationOn,
  Star,
  Handshake,
  People,
  Chat,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./Profile";
import Navbar from "./Navbar";
import {
  getSkillsGroupedByCategoryAction,
  getAllCountiesAction,
  searchUsersBySkillAndCountyAction,
  getAllUsersAction,
} from "../../../common/state/CommonActions";
import { CATEGORY_ICONS } from "../../../common/CategoryIcons";
import MessageChat from "./MessageChat";

// Mock user matches data
const mockUsers = [
  {
    id: 1,
    name: "John Kamau",
    location: "Nairobi, Kilimani",
    county: "Nairobi",
    profilePicture: "/professional-man-smiling.png",
    skillsOffered: ["Plumbing", "Electrical Work"],
    skillsNeeded: ["Web Development", "Digital Marketing"],
    rating: 4.8,
    completedTrades: 12,
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    location: "Nairobi, Karen",
    county: "Nairobi",
    profilePicture: "/professional-woman-teacher.png",
    skillsOffered: ["Fitness Training", "Nutrition Counseling"],
    skillsNeeded: ["Photography", "Video Editing"],
    rating: 4.9,
    completedTrades: 18,
  },
  {
    id: 3,
    name: "David Omondi",
    location: "Nairobi, CBD",
    county: "Nairobi",
    profilePicture: "/professional-man-glasses.png",
    skillsOffered: ["Carpentry", "Painting"],
    skillsNeeded: ["Graphic Design", "Content Creation"],
    rating: 4.7,
    completedTrades: 9,
  },
  {
    id: 4,
    name: "Sarah Akinyi",
    location: "Nairobi, Parklands",
    county: "Nairobi",
    profilePicture: "/professional-woman-laptop.png",
    skillsOffered: ["Tutoring", "Language Teaching"],
    skillsNeeded: ["Web Development", "Mobile Apps"],
    rating: 5.0,
    completedTrades: 15,
  },
  {
    id: 5,
    name: "Peter Mwangi",
    location: "Kiambu, Ruaka",
    county: "Kiambu",
    profilePicture: "/professional-man-suit.png",
    skillsOffered: ["Accounting", "Business Planning"],
    skillsNeeded: ["Photography", "Graphic Design"],
    rating: 4.6,
    completedTrades: 7,
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("All Counties");
  // const [countySearch, setCountySearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const suggestionsPaperRef = useRef(null);
  const searchResultsRef = useRef(null);

  const { user } = useSelector((state) => state.AuthReducer);

  const {
    getSkillsGroupedByCategoryResp,
    getAllCounties,
    getAllCountiesResp,
    searchUsersBySkillAndCounty,
    searchUsersBySkillAndCountyResp,
    // getAllUsers,
    getAllUsersResp,
  } = useSelector((state) => state.CommonReducer);

  // Transform API data to match component structure
  const SKILLS_DATABASE = getSkillsGroupedByCategoryResp || {};

  // Flatten all skills for autocomplete
  const ALL_SKILLS = Object.entries(SKILLS_DATABASE).flatMap(
    ([category, skills]) =>
      (skills || []).map((skillObj) => ({
        skill: skillObj.name,
        category: category,
        icon: CATEGORY_ICONS[category] || "🔹",
        id: skillObj.id,
      }))
  );

  // Search users using API based on search query and county
  const handleSearch = () => {
    const skill = searchQuery.trim() || "";
    const county = selectedCounty === "All Counties" ? "" : selectedCounty;

    dispatch(
      searchUsersBySkillAndCountyAction({
        skill,
        county,
      })
    );

    // Smooth scroll to search results section after a short delay
    setTimeout(() => {
      if (searchResultsRef.current) {
        searchResultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 300); // Small delay to ensure the search state updates
  };

  // Filter skills based on search for autocomplete
  useEffect(() => {
    if (searchQuery.trim() && isSearchFocused) {
      const filtered = ALL_SKILLS.filter((item) =>
        item.skill.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8); // Limit suggestions
      setFilteredSkills(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSkills([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, isSearchFocused]);

  // Load skills and counties data on component mount
  useEffect(() => {
    dispatch(getSkillsGroupedByCategoryAction());
    dispatch(getAllCountiesAction());
    dispatch(getAllUsersAction());
  }, [dispatch]);

  // Update filtered users when API response changes
  useEffect(() => {
    if (searchUsersBySkillAndCountyResp) {
      setFilteredUsers(searchUsersBySkillAndCountyResp);
    }
  }, [searchUsersBySkillAndCountyResp]);

  // Set initial users when getAllUsers response is available
  useEffect(() => {
    if (getAllUsersResp && getAllUsersResp.length > 0) {
      setFilteredUsers(getAllUsersResp);
    }
  }, [getAllUsersResp]);

  // Handle clicks outside of search area to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        suggestionsPaperRef.current &&
        !suggestionsPaperRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle skill selection from autocomplete
  const handleSkillSelect = (skillName) => {
    // Immediately hide suggestions and set search query
    setShowSuggestions(false);
    setIsSearchFocused(false);
    setSearchQuery(skillName);

    // Use setTimeout to ensure state updates are processed
    setTimeout(() => {
      // Perform API search with the selected skill
      // const county = selectedCounty === "All Counties" ? "" : selectedCounty;

      // dispatch(
      //   searchUsersBySkillAndCountyAction({
      //     skill: skillName,
      //     county,
      //   })
      // );

      // Blur the input after selection
      if (searchInputRef.current) {
        const input = searchInputRef.current.querySelector("input");
        if (input) {
          input.blur();
        }
      }
    }, 10); // Small delay to ensure state updates
  };

  // Handle clearing the search query
  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    setSelectedCounty("All Counties");

    // Reset to show all users without making API call with empty params
    if (getAllUsersResp && getAllUsersResp.length > 0) {
      setFilteredUsers(getAllUsersResp);
    } else {
      // Fallback to mock users if no API data available
      setFilteredUsers(mockUsers);
    }

    if (searchInputRef.current) {
      const input = searchInputRef.current.querySelector("input");
      if (input) {
        input.focus(); // Keep focus on input after clearing
      }
    }
  };

  // Get user initials for avatar fallback
  // const getInitials = (name) => {
  //   return name
  //     .split(" ")
  //     .map((n) => n[0])
  //     .join("")
  //     .toUpperCase();
  // };

  // CHAT DRAWER
  const toggleDrawer =
    (value, user = null) =>
    () => {
      setOpenDrawer(value);
      if (value && user) {
        setSelectedUser(user);
      } else if (!value) {
        // Don't clear selectedUser when closing, keep it for reopen
        // setSelectedUser(null);
      }
    };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <Box sx={{ py: 4, bgcolor: "primary.main2" }}>
        <Container>
          <Box sx={{ mb: 6, maxWidth: "100%", mx: "auto" }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Welcome, {user?.fullName.split(" ")[0]}! 👋
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Start your skill exchange journey here
              </Typography>
            </Box>

            <Card
              elevation={isSearchFocused ? 8 : 4}
              sx={{
                transition: "all 0.3s ease",
                transform: isSearchFocused ? "scale(1.02)" : "scale(1)",
                boxShadow: isSearchFocused
                  ? "0 20px 40px rgba(25, 118, 210, 0.2)"
                  : undefined,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      bgcolor: "primary.main2",
                      mb: 2,
                      opacity: 0.8,
                    }}
                  >
                    <Search sx={{ fontSize: "2rem", color: "primary.main" }} />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Find Your Perfect Skill Match
                  </Typography>
                  <Typography color="text.secondary">
                    Search for the skills you need and connect with talented
                    individuals in your community
                  </Typography>
                </Box>

                <Stack spacing={3}>
                  <Box ref={searchInputRef} sx={{ position: "relative" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search a skill to barter... (e.g., plumbing, web design, photography)"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchFocused(true);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      onFocus={() => {
                        setIsSearchFocused(true);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: searchQuery && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClearSearch}
                              edge="end"
                              size="small"
                              sx={{
                                color: "action.active",
                                "&:hover": {
                                  backgroundColor: "action.hover",
                                },
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: 64,
                          fontSize: "1.125rem",
                          "& fieldset": {
                            borderColor: "primary.main",
                            borderWidth: 1,
                          },
                          "&:hover fieldset": {
                            borderColor: "darkred",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                            borderWidth: 2,
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "16px 14px",
                          height: "100%",
                          boxSizing: "border-box",
                        },
                      }}
                    />

                    {/* Autocomplete Suggestions */}
                    {showSuggestions && filteredSkills.length > 0 && (
                      <Fade in={showSuggestions}>
                        <Paper
                          ref={suggestionsPaperRef}
                          elevation={3}
                          sx={{
                            position: "absolute",
                            zIndex: 10,
                            width: "100%",
                            mt: 0.5,
                            maxHeight: 256,
                            overflowY: "auto",
                            borderRadius: 2,
                          }}
                        >
                          {filteredSkills.map((item, index) => (
                            <Box
                              key={index}
                              onClick={() => {
                                handleSkillSelect(item.skill);
                              }}
                              sx={{
                                px: 2,
                                py: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                borderBottom:
                                  index < filteredSkills.length - 1
                                    ? "1px solid"
                                    : "none",
                                borderColor: "divider",
                                "&:hover": {
                                  backgroundColor: "grey.100",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Typography variant="h6" component="span">
                                  {item.icon}
                                </Typography>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    fontWeight="medium"
                                  >
                                    {item.skill}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {item.category}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Paper>
                      </Fade>
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Autocomplete
                      value={selectedCounty}
                      onChange={(event, newValue) => {
                        setSelectedCounty(newValue || "All Counties");
                      }}
                      options={[
                        "All Counties",
                        ...(getAllCountiesResp?.map((county) => county.name) ||
                          []),
                      ]}
                      getOptionLabel={(option) => option}
                      filterOptions={(options, { inputValue }) => {
                        if (!inputValue) return options;

                        const searchTerm = inputValue.toLowerCase();
                        return options.filter((option) =>
                          option.toLowerCase().includes(searchTerm)
                        );
                      }}
                      disabled={getAllCounties}
                      loading={getAllCounties}
                      sx={{ flex: 1, minWidth: 200 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="County"
                          placeholder="Search county..."
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                <InputAdornment position="start">
                                  <LocationOn color="primary" />
                                </InputAdornment>
                                {params.InputProps.startAdornment}
                              </>
                            ),
                            endAdornment: (
                              <>
                                {getAllCounties ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                            sx: { height: 56 },
                          }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <li {...props} key={option}>
                          {option}
                        </li>
                      )}
                      noOptionsText="No counties found"
                      isOptionEqualToValue={(option, value) => option === value}
                    />

                    <Button
                      disabled={!searchQuery.trim()}
                      onClick={handleSearch}
                      variant="contained"
                      size="large"
                      startIcon={<Search />}
                      sx={{
                        height: 56,
                        px: 4,
                        fontSize: "1rem",
                        fontWeight: 600,
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: searchQuery.trim()
                            ? "scale(1.05)"
                            : "none",
                        },
                      }}
                    >
                      Search Skills
                    </Button>
                  </Box>

                  <Box sx={{ pt: 2 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, textAlign: "center" }}
                    >
                      Popular searches:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        justifyContent: "center",
                      }}
                    >
                      {[
                        "Plumbing",
                        "Web Development",
                        "Graphic Design",
                        "Fitness Training",
                        "Photography",
                      ].map((skill) => (
                        <Button
                          key={skill}
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setSearchQuery(skill);
                            setShowSuggestions(false);
                            // Perform API search immediately
                            // dispatch(
                            //   searchUsersBySkillAndCountyAction({
                            //     skill,
                            //     county,
                            //   })
                            // );
                          }}
                          sx={{
                            transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "white",
                            },
                          }}
                        >
                          {skill}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              gap: 2,
              mt: 2,
            }}
          >
            <Box sx={{ width: { xs: "100%", md: "35%" } }}>
              <Profile />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "65%" } }}>
              <Box ref={searchResultsRef}>
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
                  <Card elevation={3}>
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
                  <Card elevation={3}>
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
                          setSearchQuery("");
                          setSelectedCounty("All Counties");
                          // Reset to show all users without making API call with empty params
                          if (getAllUsersResp && getAllUsersResp.length > 0) {
                            setFilteredUsers(getAllUsersResp);
                          } else {
                            setFilteredUsers(mockUsers);
                          }
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
                            <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
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
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {user?.cityOrTown || user?.county},{" "}
                                    {user?.country || "Kenya"}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    📩 {user?.email || user?.contact}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            {/* Skills */}
                            <Box sx={{ flex: 1 }}>
                              <Stack spacing={2}>
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
                                    {(() => {
                                      // ✅ Combine both user.skills and user.skill
                                      let rawSkills =
                                        user?.skills ?? user?.skill;

                                      if (!rawSkills) {
                                        return (
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            No skills listed
                                          </Typography>
                                        );
                                      }

                                      let skillsToDisplay = [];

                                      // Handle if string (comma or semicolon separated)
                                      if (typeof rawSkills === "string") {
                                        skillsToDisplay = rawSkills
                                          .split(
                                            /[,;|]|(?=[A-Z][a-z])|(?<=[a-z])(?=[A-Z])/
                                          )
                                          .map((s) => s.trim())
                                          .filter((s) => s.length > 0);
                                      }
                                      // Handle if array
                                      else if (Array.isArray(rawSkills)) {
                                        skillsToDisplay = rawSkills.filter(
                                          (s) => s && s.length > 0
                                        );
                                      }
                                      // Handle other cases
                                      else {
                                        skillsToDisplay = [
                                          String(rawSkills),
                                        ].filter((s) => s && s.length > 0);
                                      }

                                      return skillsToDisplay.map(
                                        (skill, index) => (
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
                                        )
                                      );
                                    })()}
                                  </Box>
                                </Box>

                                {/* Optional: Skills Offered */}
                                {user.skillsOffered && (
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{ mb: 1, display: "block" }}
                                    >
                                      All Skills Offered
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                      }}
                                    >
                                      {user.skillsOffered.map(
                                        (skill, index) => (
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
                                        )
                                      )}
                                    </Box>
                                  </Box>
                                )}

                                {/* Optional: Skills Needed */}
                                {user.skillsNeeded && (
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{ mb: 1, display: "block" }}
                                    >
                                      Skills Needed
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                      }}
                                    >
                                      {user.skillsNeeded.map((skill, index) => (
                                        <Box
                                          key={index}
                                          sx={{
                                            border: "1px solid",
                                            borderColor: "primary.main",
                                            color: "primary.main",
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
                            {/* <Box
                              sx={{
                                display: "flex",
                                flexDirection: { xs: "row", md: "column" },
                                gap: 1,
                                justifyContent: { md: "center" },
                              }}
                            >
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<Handshake />}
                                sx={{ flex: { xs: 1, md: "none" } }}
                              >
                                Request Trade
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Chat />}
                                sx={{ flex: { xs: 1, md: "none" } }}
                                onClick={toggleDrawer(true)}
                              >
                                Message
                              </Button>
                            </Box> */}
                            <Stack
                              direction={{ xs: "column", md: "column" }} // column on mobile, row on desktop
                              spacing={1}
                              alignItems="center" // centers when row
                              // sx={{ mt: 1 }}
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
                                  // width: { xs: "100%", md: 220 }, // full width on mobile, fixed on desktop
                                  // height: 72, // keep your desired height
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
                                  // width: { xs: "100%", md: 140 }, // full width on mobile, fixed on desktop
                                  // height: 72,
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
            </Box>
          </Box>
        </Container>
      </Box>

      <MessageChat
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        selectedUser={selectedUser}
      />
    </Box>
  );
}
