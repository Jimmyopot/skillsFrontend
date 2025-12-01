// import { useState, useEffect } from "react";
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
// import { loginAction, checkAuthAction } from "../state/LoginActions";
// import { clearLoginError } from "../state/LoginSlice";
// import { useSnackbar } from "../../../common/snackbar/SnackbarContext";
// import { login } from "../state/authSlice";

// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { showSnackbar } = useSnackbar();

//   const {authLoading} = useSelector((state) => state.AuthReducer);

//   // Local state
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // formErrors contains field-level helper text (email/password) and optional api general error
//   const [formErrors, setFormErrors] = useState({});

//   // Redux state - ensure this selector matches your store key
//   // @ts-ignore
//   const { isAuthenticated, loading, error, checkingAuth } = useSelector(
//     (state) => state.LoginReducer || {}
//   );

//   // check auth on mount
//   useEffect(() => {
//     // @ts-ignore
//     dispatch(checkAuthAction());
//   }, [dispatch]);

//   // Map Redux loginError -> formErrors so fields show helper text when backend returns 401
//   useEffect(() => {
//     if (!error) return;

//     // error is expected to be an object like { message, status, ... }
//     const msg = error.message || "Login failed. Please try again.";

//     if (error.status === 401) {
//       // Invalid credentials: show under both fields (you can change to only password)
//       setFormErrors({
//         email: "Invalid email or password",
//         password: "Invalid email or password",
//       });
//     } else {
//       // Other errors - show general API error (and optionally under fields)
//       setFormErrors((prev) => ({
//         ...prev,
//         api: msg,
//       }));
//     }
//   }, [error]);

//   // Clear login error when user edits fields (clear the Redux error and the local field error)
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     // clear local field error
//     setFormErrors((prev) => ({ ...prev, email: undefined, api: undefined }));
//     // clear global login error in Redux so error doesn't persist
//     if (error) dispatch(clearLoginError());
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setFormErrors((prev) => ({ ...prev, password: undefined, api: undefined }));
//     if (error) dispatch(clearLoginError());
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

//     // Clear previous client errors + redux login error
//     setFormErrors({});
//     if (error) dispatch(clearLoginError());

//     if (!validateForm()) return;

//     try {
//       // Await the dispatch to get the actual result
//       const res = await dispatch(
//         login({
//           email: email.trim(),
//           password,
//         })
//       ).unwrap();

//       if (res?.success) {
//         localStorage.setItem("authToken", res.authToken);
//         localStorage.setItem("user", JSON.stringify(res.user));
//         showSnackbar(res.message, "success");
//         navigate("/dashboard");
//       } else {
//         showSnackbar(res.message, "error");
//       }
//       // Handle successful login here
//       // The response should contain your token and user data
//     } catch (error) {
//       console.error("Login failed:", error);
//       // Handle login error here
//     }
//   };
//   useEffect(() => {
//     localStorage.clear();
//   }, []);
 
//   if (checkingAuth) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

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
//           <a style={{ textDecoration: "none" }}>
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: "bold",
//                 color: "primary.main",
//                 mb: 1,
//                 fontSize: 32,
//               }}
//             >
//               NipeNikupe
//             </Typography>
//           </a>
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
//                 disabled={loading}
//                 sx={{
//                   backgroundColor: "background.paper",
//                   "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                   // ensure helper text uses theme error color
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
//                 disabled={loading}
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
//                 <Link to="/forgot-password">
//                   <a
//                     style={{
//                       fontSize: 14,
//                       color: "primary.main",
//                       textDecoration: "none",
//                       transition: "color 0.2s",
//                     }}
//                   >
//                     Forgot password?
//                   </a>
//                 </Link>
//               </Box>

//               {/* General API error (non-401 or additional info) */}
//               {formErrors.api && (
//                 <Alert severity="error" sx={{ borderRadius: 2 }}>
//                   {formErrors.api}
//                 </Alert>
//               )}

//               {/* If you still want the global error object display (optional) */}
//               {!formErrors.api && error && error.status !== 401 && (
//                 <Alert severity="error" sx={{ borderRadius: 2 }}>
//                   {error.message || "Login failed. Please try again."}
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


import { useState, useEffect } from "react";
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

  const { authLoading, user } = useSelector((state) => state.AuthReducer);

  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Clear login error when user edits fields
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormErrors((prev) => ({ ...prev, email: undefined, api: undefined }));
    setLoginError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormErrors((prev) => ({ ...prev, password: undefined, api: undefined }));
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

    if (!validateForm()) return;

    try {
      const res = await dispatch(
        login({
          email: email.trim(),
          password,
        })
      ).unwrap();

      if (res?.success) {
        showSnackbar(res.message || "Login successful!", "success");
        navigate("/dashboard");
      } else {
        showSnackbar(res.message || "Login failed", "error");
        setLoginError(res.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg = error?.message || "Login failed. Please try again.";

      // Handle 401 errors specifically
      if (error?.status === 401 || errorMsg.includes("Invalid credentials")) {
        setFormErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
      } else {
        setLoginError(errorMsg);
      }

      showSnackbar(errorMsg, "error");
    }
  };

  if (authLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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

              {/* General API error */}
              {loginError && (
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