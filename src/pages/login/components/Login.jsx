// import { useState, useEffect, useRef } from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import CardHeader from "@mui/material/CardHeader";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Divider from "@mui/material/Divider";
// import Alert from "@mui/material/Alert";
// import CircularProgress from "@mui/material/CircularProgress";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useSnackbar } from "../../../common/snackbar/SnackbarContext";
// import { login } from "../state/authSlice";

// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { showSnackbar } = useSnackbar();
//   const hasRedirected = useRef(false);

//   const { authLoading, user } = useSelector((state) => state.AuthReducer);

//   // Local state
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formErrors, setFormErrors] = useState({});
//   const [loginError, setLoginError] = useState(null);

//   // Redirect if already logged in - Only run once
//   useEffect(() => {
//     if (user && !hasRedirected.current) {
//       hasRedirected.current = true;
//       navigate("/dashboard", { replace: true });
//     }
//   }, [user, navigate]);

//   // Clear login error when user edits fields
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setFormErrors((prev) => ({ ...prev, email: undefined, api: undefined }));
//     setLoginError(null);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setFormErrors((prev) => ({ ...prev, password: undefined, api: undefined }));
//     setLoginError(null);
//   };

//   // Basic client-side validation
//   const validateForm = () => {
//     const errors = {};

//     if (!email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Enter a valid email address";
//     }

//     if (!password.trim()) {
//       errors.password = "Password is required";
//     } else if (password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Clear previous errors
//     setFormErrors({});
//     setLoginError(null);

//     if (!validateForm()) return;

//     try {
//       const res = await dispatch(
//         login({
//           email: email.trim(),
//           password,
//         })
//       ).unwrap();

//       // Show success message but DON'T navigate yet
//       // Let the useEffect handle navigation after state updates
//       showSnackbar(res.message || "Login successful!", "success");
      
//       // Navigation will happen automatically via useEffect
//       // This prevents the white flash
//     } catch (error) {
//       console.error("Login failed:", error);
//       const errorMsg = error?.message || "Login failed. Please try again.";

//       // Handle 401 errors or invalid credentials
//       if (
//         error?.status === 401 ||
//         errorMsg.toLowerCase().includes("invalid credentials") ||
//         errorMsg.toLowerCase().includes("password")
//       ) {
//         setFormErrors({
//           email: "Invalid email or password",
//           password: "Invalid email or password",
//         });
//       } else {
//         setLoginError(errorMsg);
//       }

//       showSnackbar(errorMsg, "error");
//     }
//   };

//   // Remove the full-page loading spinner that causes layout shift
//   // Keep the form visible with just the button showing loading state

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         p: 2,
//         background: "linear-gradient(135deg, var(--background), var(--muted))",
//         bgcolor: "primary.main2",
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         sx={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}
//       >
//         <Box sx={{ textAlign: "center", mb: 4 }}>
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: "bold",
//               color: "primary.main",
//               mb: 1,
//               fontSize: 32,
//             }}
//           >
//             NipeNikupe
//           </Typography>
//           <Typography sx={{ color: "text.secondary" }}>
//             Welcome back! Sign in to continue
//           </Typography>
//         </Box>

//         <Card
//           sx={{
//             boxShadow: 8,
//             backdropFilter: "blur(6px)",
//             background: "rgba(255,255,255,0.95)",
//             border: "1px solid",
//             borderColor: "divider",
//             // Prevent layout shift during loading
//             transition: "opacity 0.2s ease-in-out",
//             opacity: authLoading ? 0.7 : 1,
//           }}
//         >
//           <CardHeader
//             title={
//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: "bold", textAlign: "center" }}
//               >
//                 Sign In
//               </Typography>
//             }
//             subheader={
//               <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
//                 Enter your credentials to access your account
//               </Typography>
//             }
//             sx={{ pb: 0 }}
//           />
//           <CardContent>
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//             >
//               {/* Email Field */}
//               <TextField
//                 id="email"
//                 label="Email Address"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={handleEmailChange}
//                 required
//                 fullWidth
//                 variant="outlined"
//                 size="medium"
//                 error={!!formErrors.email}
//                 helperText={formErrors.email}
//                 disabled={authLoading}
//                 sx={{
//                   backgroundColor: "background.paper",
//                   "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                   "& .MuiFormHelperText-root": { color: "error.main" },
//                 }}
//               />

//               {/* Password Field */}
//               <TextField
//                 id="password"
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 required
//                 fullWidth
//                 variant="outlined"
//                 size="medium"
//                 error={!!formErrors.password}
//                 helperText={formErrors.password}
//                 disabled={authLoading}
//                 sx={{
//                   backgroundColor: "background.paper",
//                   "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                   "& .MuiFormHelperText-root": { color: "error.main" },
//                 }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label={
//                           showPassword ? "Hide password" : "Show password"
//                         }
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                         size="small"
//                         disabled={authLoading}
//                         sx={{
//                           color: "text.secondary",
//                           "&:hover": { color: "text.primary" },
//                         }}
//                       >
//                         {showPassword ? (
//                           <VisibilityOffIcon fontSize="small" />
//                         ) : (
//                           <VisibilityIcon fontSize="small" />
//                         )}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
//                 <Link to="/forgot-password" style={{ textDecoration: "none" }}>
//                   <Typography
//                     sx={{
//                       fontSize: 14,
//                       color: "primary.main",
//                       textDecoration: "none",
//                       transition: "color 0.2s",
//                       "&:hover": { color: "primary.dark" },
//                     }}
//                   >
//                     Forgot password?
//                   </Typography>
//                 </Link>
//               </Box>

//               {/* General API error */}
//               {loginError && (
//                 <Alert severity="error" sx={{ borderRadius: 2 }}>
//                   {loginError}
//                 </Alert>
//               )}

//               {/* Login Button */}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 size="large"
//                 disabled={authLoading}
//                 sx={{
//                   fontWeight: 600,
//                   py: 1.5,
//                   mt: 1,
//                   boxShadow: 2,
//                   textTransform: "none",
//                   fontSize: 18,
//                   position: "relative",
//                   // Smooth transition for loading state
//                   transition: "all 0.2s ease-in-out",
//                 }}
//                 endIcon={
//                   authLoading ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     <ArrowRightAltIcon sx={{ fontSize: 22 }} />
//                   )
//                 }
//               >
//                 {authLoading ? "Signing In..." : "Sign In"}
//               </Button>
//             </Box>
//           </CardContent>

//           <CardActions
//             sx={{
//               flexDirection: "column",
//               alignItems: "stretch",
//               gap: 2,
//               px: 2,
//               pb: 2,
//             }}
//           >
//             <Divider sx={{ my: 1 }}>Or</Divider>
//             <Box sx={{ textAlign: "center", fontSize: 15 }}>
//               <Typography
//                 component="span"
//                 sx={{ color: "text.secondary", fontSize: 14 }}
//               >
//                 Don't have an account?{" "}
//               </Typography>
//               <Link to="/signUp" style={{ textDecoration: "none" }}>
//                 <Typography
//                   component="span"
//                   sx={{
//                     textTransform: "none",
//                     textDecoration: "underline",
//                     color: "secondary.main",
//                     cursor: "pointer",
//                     fontSize: 14,
//                     fontWeight: 600,
//                     display: "inline-flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   Create Account
//                   <ArrowRightAltIcon sx={{ fontSize: 18, ml: 0.5 }} />
//                 </Typography>
//               </Link>
//             </Box>
//           </CardActions>
//         </Card>

//         <Box sx={{ mt: 3, textAlign: "center" }}>
//           <Typography
//             variant="caption"
//             sx={{ color: "text.secondary", fontSize: 12 }}
//           >
//             🔒 Your information is secure and encrypted
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// }


import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "../../../common/snackbar/SnackbarContext";
import { login } from "../state/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const hasRedirected = useRef(false);

  const { authLoading, user } = useSelector((state) => state.AuthReducer);

  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [credentialError, setCredentialError] = useState(null);

  // Redirect if already logged in - Only run once
  useEffect(() => {
    if (user && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  // Clear login error when user edits fields
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormErrors((prev) => ({ ...prev, email: undefined }));
    setCredentialError(null);
    setLoginError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormErrors((prev) => ({ ...prev, password: undefined }));
    setCredentialError(null);
    setLoginError(null);
  };

  // Basic client-side validation
  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({});
    setLoginError(null);
    setCredentialError(null);

    if (!validateForm()) return;

    try {
      const res = await dispatch(
        login({
          email: email.trim(),
          password,
        })
      ).unwrap();

      // Show success message but DON'T navigate yet
      // Let the useEffect handle navigation after state updates
      showSnackbar(res.message || "Login successful!", "success");
      
      // Navigation will happen automatically via useEffect
      // This prevents the white flash
    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg = error?.message || "Login failed. Please try again.";

      // Handle 401 errors or invalid credentials with unified message
      if (
        error?.status === 401 ||
        errorMsg.toLowerCase().includes("invalid credentials") ||
        errorMsg.toLowerCase().includes("password") ||
        errorMsg.toLowerCase().includes("email")
      ) {
        // Set unified credential error (not individual field errors)
        setCredentialError("Invalid email or password");
        showSnackbar("Invalid email or password", "error");
      } else {
        // For other errors (network, server, etc.)
        setLoginError(errorMsg);
        showSnackbar(errorMsg, "error");
      }
    }
  };

  // Remove the full-page loading spinner that causes layout shift
  // Keep the form visible with just the button showing loading state

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        p: 2,
        background: "linear-gradient(135deg, var(--background), var(--muted))",
        bgcolor: "primary.main2",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 1,
              fontSize: 32,
            }}
          >
            NipeNikupe
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Welcome back! Sign in to continue
          </Typography>
        </Box>

        <Card
          sx={{
            boxShadow: 8,
            backdropFilter: "blur(6px)",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid",
            borderColor: "divider",
            // Prevent layout shift during loading
            transition: "opacity 0.2s ease-in-out",
            opacity: authLoading ? 0.7 : 1,
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Sign In
              </Typography>
            }
            subheader={
              <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                Enter your credentials to access your account
              </Typography>
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {/* Email Field */}
              <TextField
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                required
                fullWidth
                variant="outlined"
                size="medium"
                error={!!formErrors.email}
                helperText={formErrors.email}
                disabled={authLoading}
                sx={{
                  backgroundColor: "background.paper",
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                  "& .MuiFormHelperText-root": { color: "error.main" },
                }}
              />

              {/* Password Field */}
              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
                fullWidth
                variant="outlined"
                size="medium"
                error={!!formErrors.password}
                helperText={formErrors.password}
                disabled={authLoading}
                sx={{
                  backgroundColor: "background.paper",
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                  "& .MuiFormHelperText-root": { color: "error.main" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        disabled={authLoading}
                        sx={{
                          color: "text.secondary",
                          "&:hover": { color: "text.primary" },
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "primary.main",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      "&:hover": { color: "primary.dark" },
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Box>

              {/* Unified credential error message */}
              {credentialError && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {credentialError}
                </Alert>
              )}

              {/* General API error (for non-credential issues) */}
              {loginError && !credentialError && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {loginError}
                </Alert>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={authLoading}
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                  mt: 1,
                  boxShadow: 2,
                  textTransform: "none",
                  fontSize: 18,
                  position: "relative",
                  // Smooth transition for loading state
                  transition: "all 0.2s ease-in-out",
                }}
                endIcon={
                  authLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <ArrowRightAltIcon sx={{ fontSize: 22 }} />
                  )
                }
              >
                {authLoading ? "Signing In..." : "Sign In"}
              </Button>
            </Box>
          </CardContent>

          <CardActions
            sx={{
              flexDirection: "column",
              alignItems: "stretch",
              gap: 2,
              px: 2,
              pb: 2,
            }}
          >
            <Divider sx={{ my: 1 }}>Or</Divider>
            <Box sx={{ textAlign: "center", fontSize: 15 }}>
              <Typography
                component="span"
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Don't have an account?{" "}
              </Typography>
              <Link to="/signUp" style={{ textDecoration: "none" }}>
                <Typography
                  component="span"
                  sx={{
                    textTransform: "none",
                    textDecoration: "underline",
                    color: "secondary.main",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  Create Account
                  <ArrowRightAltIcon sx={{ fontSize: 18, ml: 0.5 }} />
                </Typography>
              </Link>
            </Box>
          </CardActions>
        </Card>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: 12 }}
          >
            🔒 Your information is secure and encrypted
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}