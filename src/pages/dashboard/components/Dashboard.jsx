/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef, useMemo } from "react";
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
  getSuggestedMatchesAction,
} from "../../../common/state/CommonActions";
import { CATEGORY_ICONS } from "../../../common/CategoryIcons";
import MessageChat from "./MessageChat";
import Suggestedmatches from "./Suggestedmatches";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("All Counties");
  // const [countySearch, setCountySearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
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
    getSuggestedMatchesResp,
  } = useSelector((state) => state.CommonReducer);

  // Transform API data to match component structure
  const SKILLS_DATABASE = useMemo(
    () => getSkillsGroupedByCategoryResp || {},
    [getSkillsGroupedByCategoryResp]
  );

  // Flatten all skills for autocomplete
  const ALL_SKILLS = useMemo(
    () =>
      Object.entries(SKILLS_DATABASE).flatMap(([category, skills]) =>
        (skills || []).map((skillObj) => ({
          skill: skillObj.name,
          category: category,
          icon: CATEGORY_ICONS[category] || "🔹",
          id: skillObj.id,
        }))
      ),
    [SKILLS_DATABASE]
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
  }, [searchQuery, isSearchFocused, ALL_SKILLS]);

  // Load skills and counties data on component mount
  useEffect(() => {
    dispatch(getSkillsGroupedByCategoryAction());
    dispatch(getAllCountiesAction());
    
    // Get suggested matches for the current user (API returns 3 matches automatically)
    if (user?.userId || user?.id) {
      const userId = user.userId || user.id;
      
      dispatch(getSuggestedMatchesAction({
        userId,
      }));
    }
  }, [dispatch, user?.userId, user?.id]);

  // Update filtered users when API response changes
  useEffect(() => {
    if (searchUsersBySkillAndCountyResp) {
      console.log("Search API Response:", searchUsersBySkillAndCountyResp);
      
      // Transform search results to include skills in the same format
      const transformedResults = searchUsersBySkillAndCountyResp.map(user => {
        console.log("User object from search:", user);
        
        // Extract skills from various possible field names
        const skills = user.skillsOffered 
          || user.allUserSkills 
          || user.allSkills 
          || user.skills 
          || user.userSkills
          || [];
        
        console.log("Extracted skills:", skills);
        
        return {
          ...user,
          skillsOffered: Array.isArray(skills) ? skills : [skills],
          userId: user.userId || user.id,
          fullName: user.fullName || user.name,
        };
      });
      
      console.log("Transformed Results:", transformedResults);
      setFilteredUsers(transformedResults);
    }
  }, [searchUsersBySkillAndCountyResp]);

  // Set initial users when getSuggestedMatches response is available
  useEffect(() => {
    if (getSuggestedMatchesResp?.suggestedMatches && getSuggestedMatchesResp.suggestedMatches.length > 0) {
      // Transform API response to match component structure
      const transformedUsers = getSuggestedMatchesResp.suggestedMatches.map(match => ({
        userId: match.userId,
        id: match.userId,
        name: match.fullName,
        fullName: match.fullName,
        location: match.localityOrArea 
          ? `${match.cityOrTown}, ${match.localityOrArea}` 
          : match.cityOrTown,
        county: match.cityOrTown,
        cityOrTown: match.cityOrTown,
        country: match.country,
        email: match.email,
        contact: match.email,
        phoneNumber: match.phoneNumber,
        skillsOffered: match.allUserSkills || match.allSkills || [match.matchedSkill],
        skillsNeeded: [],
        rating: 0,
        completedTrades: 0,
        profilePicture: null,
        matchType: match.matchType,
        matchedSkill: match.matchedSkill,
      }));
      setFilteredUsers(transformedUsers);
    }
  }, [getSuggestedMatchesResp]);

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

    // Reset to show suggested matches
    if (getSuggestedMatchesResp?.suggestedMatches && getSuggestedMatchesResp.suggestedMatches.length > 0) {
      // Transform API response to match component structure
      const transformedUsers = getSuggestedMatchesResp.suggestedMatches.map(match => ({
        userId: match.userId,
        id: match.userId,
        name: match.fullName,
        fullName: match.fullName,
        location: match.localityOrArea 
          ? `${match.cityOrTown}, ${match.localityOrArea}` 
          : match.cityOrTown,
        county: match.cityOrTown,
        cityOrTown: match.cityOrTown,
        country: match.country,
        email: match.email,
        contact: match.email,
        phoneNumber: match.phoneNumber,
        skillsOffered: match.allUserSkills || match.allSkills || [match.matchedSkill],
        skillsNeeded: [],
        rating: 0,
        completedTrades: 0,
        profilePicture: null,
        matchType: match.matchType,
        matchedSkill: match.matchedSkill,
      }));
      setFilteredUsers(transformedUsers);
    } else {
      // Fallback to empty array if no API data available
      setFilteredUsers([]);
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
              elevation={isSearchFocused ? 8 : 0}
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
              <Suggestedmatches
                searchResultsRef={searchResultsRef}
                searchQuery={searchQuery}
                selectedCounty={selectedCounty}
                searchUsersBySkillAndCounty={searchUsersBySkillAndCounty}
                filteredUsers={filteredUsers}
                handleClearSearch={handleClearSearch}
                toggleDrawer={toggleDrawer}
              />
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
