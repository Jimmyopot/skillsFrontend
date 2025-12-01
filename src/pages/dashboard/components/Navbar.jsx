// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Divider,
//   Badge,
//   Button,
//   Chip,
// } from "@mui/material";
// import {
//   Notifications as NotificationsIcon,
//   Handshake as HandshakeIcon,
//   ExpandMore as ExpandMoreIcon,
//   Person as PersonIcon,
//   Settings as SettingsIcon,
//   Help as HelpIcon,
//   Logout as LogoutIcon,
//   LightMode as LightModeIcon,
//   DarkMode as DarkModeIcon,
// } from "@mui/icons-material";
// import { logoutAction } from "../../login/state/LoginActions"; 
// import { useSnackbar } from "../../../common/snackbar/SnackbarContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // const { logoutLoading } = useSelector((state) => state.LoginReducer);
//   const { user } = useSelector((state) => state.AuthReducer);
//   const { showSnackbar } = useSnackbar();

//   // State for dropdown menu
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [theme, setTheme] = useState("light");
//   const isDropdownOpen = Boolean(anchorEl);

//   const currentUser = user || {
//     fullName: "John Doe",
//     email: "john.doe@example.com",
//     profilePicture: null,
//   };

//   const getInitials = (name) =>
//     name
//       .split(" ")
//       .map((part) => part.charAt(0))
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);

//   const handleDropdownClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleDropdownClose = () => {
//     setAnchorEl(null);
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   // ✅ Handle logout
//   const handleLogout = () => {
//     handleDropdownClose(); // close the dropdown immediately
    
//     // Clear localStorage immediately
//     localStorage.removeItem('user');
//     localStorage.clear(); // Clear all localStorage as extra precaution

//     showSnackbar("Logout successful!", "success");
    
//     // Dispatch logout action (don't wait for it)
//     dispatch(logoutAction()).then(() => {
//       showSnackbar("Logout successful", "success");
//     }).catch((err) => {
//       console.error("Redux logout error:", err);
//       showSnackbar("Error during logout", "error");
//     });

//     setTimeout(() => {
//       navigate("/login");
//     }, 500);
//   };

//   return (
//     <AppBar
//       position="sticky"
//       elevation={1}
//       sx={{
//         backgroundColor: "primary.main2",
//         backdropFilter: "blur(8px)",
//         borderBottom: 1,
//         borderColor: "divider",
//       }}
//     >
//       <Toolbar sx={{ px: { xs: 2, sm: 4 }, py: 1 }}>
//         {/* Logo Section */}
//         <Box
//           sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
//         >
//           <Button
//             onClick={() => navigate("/")}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               textTransform: "none",
//               color: "text.primary",
//               "&:hover": { backgroundColor: "transparent" },
//             }}
//           >
//             <Box
//               sx={{
//                 p: 1,
//                 backgroundColor: "primary.main",
//                 borderRadius: "50%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <HandshakeIcon
//                 sx={{ fontSize: 20, color: "primary.contrastText" }}
//               />
//             </Box>
//             <Typography
//               variant="h6"
//               component="span"
//               sx={{ fontWeight: "bold" }}
//             >
//               NipeNikupe
//             </Typography>
//           </Button>
//         </Box>

//         {/* Right Section */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           {/* Notifications */}
//           <IconButton size="large" sx={{ color: "text.primary" }}>
//             <Badge badgeContent="" variant="dot" color="error">
//               <NotificationsIcon sx={{ color: "primary.main" }} />
//             </Badge>
//           </IconButton>

//           {/* User Menu */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Button
//               onClick={handleDropdownClick}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 textTransform: "none",
//                 borderRadius: "50px",
//                 px: 1,
//                 py: 0.5,
//                 "&:hover": {
//                   backgroundColor: "action.hover",
//                 },
//               }}
//               aria-expanded={isDropdownOpen}
//               aria-haspopup="true"
//               aria-label="User menu"
//             >
//               <Avatar
//                 src={currentUser.profilePicture || "/placeholder.svg"}
//                 alt={currentUser.fullName}
//                 sx={{
//                   width: 36,
//                   height: 36,
//                   border: 2,
//                   borderColor: "primary.main",
//                   borderOpacity: 0.2,
//                 }}
//               >
//                 {getInitials(currentUser.fullName)}
//               </Avatar>
//               <ExpandMoreIcon
//                 sx={{
//                   fontSize: 16,
//                   color: "text.secondary",
//                   transition: "transform 0.2s",
//                   transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
//                 }}
//               />
//             </Button>

//             {/* Dropdown Menu */}
//             <Menu
//               anchorEl={anchorEl}
//               open={isDropdownOpen}
//               onClose={handleDropdownClose}
//               PaperProps={{
//                 sx: {
//                   width: 300,
//                   mt: 1,
//                   boxShadow: 3,
//                 //   bgcolor: "primary.main2",
//                   "& .MuiMenuItem-root": {
//                     px: 2,
//                     py: 1.5,
//                   },
//                 },
//               }}
//               transformOrigin={{ horizontal: "right", vertical: "top" }}
//               anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//             >
//               {/* User Info */}
//               <Box
//                 sx={{
//                   px: 2,
//                   py: 2,
//                   borderBottom: 1,
//                   borderColor: "divider",
//                   backgroundColor: "grey.50",
//                 }}
//               >
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <Avatar
//                     src={currentUser.profilePicture || "/placeholder.svg"}
//                     alt={currentUser.fullName}
//                     sx={{
//                       width: 48,
//                       height: 48,
//                       border: 2,
//                       borderColor: "primary.main",
//                       borderOpacity: 0.2,
//                     }}
//                   >
//                     {getInitials(currentUser.fullName)}
//                   </Avatar>
//                   <Box sx={{ flexGrow: 1, minWidth: 0 }}>
//                     <Typography variant="body2" fontWeight="600" noWrap>
//                       Hi, {currentUser.fullName.split(" ")[0]}! 👋
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary" noWrap>
//                       {currentUser.email}
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 0.5,
//                         mt: 0.5,
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           width: 8,
//                           height: 8,
//                           backgroundColor: "success.main",
//                           borderRadius: "50%",
//                         }}
//                       />
//                       <Typography variant="caption" color="text.secondary">
//                         Online
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>

//               {/* Menu Items */}
//               <MenuItem onClick={handleDropdownClose}>
//                 <ListItemIcon>
//                   <PersonIcon fontSize="small" />
//                 </ListItemIcon>
//                 <ListItemText primary="Update Profile" />
//               </MenuItem>

//               <MenuItem onClick={handleDropdownClose}>
//                 <ListItemIcon>
//                   <SettingsIcon fontSize="small" />
//                 </ListItemIcon>
//                 <ListItemText primary="Account Settings" />
//               </MenuItem>

//               <MenuItem onClick={handleDropdownClose}>
//                 <ListItemIcon>
//                   <HelpIcon fontSize="small" />
//                 </ListItemIcon>
//                 <ListItemText primary="Help & Support" />
//               </MenuItem>

//               <Divider />

//               {/* Theme Toggle */}
//               <MenuItem onClick={toggleTheme}>
//                 <ListItemIcon>
//                   {theme === "light" ? (
//                     <DarkModeIcon fontSize="small" />
//                   ) : (
//                     <LightModeIcon fontSize="small" />
//                   )}
//                 </ListItemIcon>
//                 <ListItemText primary="Theme" />
//                 <Chip
//                   label={theme}
//                   size="small"
//                   variant="outlined"
//                   sx={{ textTransform: "capitalize", ml: 1 }}
//                 />
//               </MenuItem>

//               <Divider />

//               {/* Logout */}
//               <MenuItem
//                 onClick={handleLogout}
//                 sx={{ color: "error.main" }}
//                 // disabled={logoutLoading}
//               >
//                 <ListItemIcon>
//                   <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
//                 </ListItemIcon>
//                 <ListItemText
//                   // primary={logoutLoading ? "Logging out..." : "Logout"}
//                   primary={"Logout"}
//                 />
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;



import { useState } from "react";
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
} from "@mui/icons-material";
import { useSnackbar } from "../../../common/snackbar/SnackbarContext";
import { logout } from "../../../pages/login/state/authSlice"; // ✅ Import logout from authSlice

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const { showSnackbar } = useSnackbar();

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [theme, setTheme] = useState("light");
  const isDropdownOpen = Boolean(anchorEl);

  const currentUser = user || {
    fullName: "John Doe",
    email: "john.doe@example.com",
    profilePicture: null,
  };

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

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // ✅ Handle logout using authSlice logout action
  const handleLogout = () => {
    handleDropdownClose(); // Close the dropdown immediately

    // Dispatch logout action (clears Redux state and localStorage)
    dispatch(logout());

    // Show success message
    showSnackbar("Logout successful!", "success");

    // Navigate to login page
    setTimeout(() => {
      navigate("/login");
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
      <Toolbar sx={{ px: { xs: 2, sm: 4 }, py: 1 }}>
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
          <IconButton size="large" sx={{ color: "text.primary" }}>
            <Badge badgeContent="" variant="dot" color="error">
              <NotificationsIcon sx={{ color: "primary.main" }} />
            </Badge>
          </IconButton>

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
              <MenuItem onClick={handleDropdownClose}>
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
              </MenuItem>

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