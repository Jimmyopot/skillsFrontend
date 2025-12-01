import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "../../common/snackbar/SnackbarContext";
import { adminLoginAction } from "./state/AdminLoginActions";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const hasRedirected = useRef(false);

  const { loading, admin } = useSelector((state) => state.AdminLoginReducer);

  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const [credentialError, setCredentialError] = useState(null);

  // Redirect if already logged in - Only run once
  useEffect(() => {
    if (admin && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate("/adminsOnly", { replace: true });
    }
  }, [admin, navigate]);

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
        adminLoginAction({
          email: email.trim(),
          password,
        })
      ).unwrap();

      // Show success message
      showSnackbar(res.message || "Admin login successful!", "success");
      
      // Navigation will happen automatically via useEffect
    } catch (error) {
      console.error("Admin login failed:", error);
      const errorMsg = error?.message || "Admin login failed. Please try again.";

      // Handle 401 errors or invalid credentials
      if (
        error?.status === 401 ||
        errorMsg.toLowerCase().includes("invalid") ||
        errorMsg.toLowerCase().includes("password") ||
        errorMsg.toLowerCase().includes("email") ||
        errorMsg.toLowerCase().includes("credentials")
      ) {
        setCredentialError("Invalid admin email or password");
        showSnackbar("Invalid admin credentials", "error");
      } else {
        // For other errors (network, server, etc.)
        setLoginError(errorMsg);
        showSnackbar(errorMsg, "error");
      }
    }
  };

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
          <AdminPanelSettingsIcon 
            sx={{ 
              fontSize: 60, 
              color: "primary.main",
              mb: 2,
              filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))"
            }} 
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 1,
              fontSize: 32,
            //   textShadow: "0px 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            Admin Portal
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Secure access for administrators only
          </Typography>
        </Box>

        <Card
          sx={{
            boxShadow: 8,
            backdropFilter: "blur(6px)",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid",
            borderColor: "divider",
            transition: "opacity 0.2s ease-in-out",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Admin Sign In
              </Typography>
            }
            subheader={
              <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                Enter your admin credentials to continue
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
                id="admin-email"
                label="Admin Email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={handleEmailChange}
                required
                fullWidth
                variant="outlined"
                size="medium"
                error={!!formErrors.email}
                helperText={formErrors.email}
                disabled={loading}
                sx={{
                  backgroundColor: "background.paper",
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                  "& .MuiFormHelperText-root": { color: "error.main" },
                }}
              />

              {/* Password Field */}
              <TextField
                id="admin-password"
                label="Admin Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your admin password"
                value={password}
                onChange={handlePasswordChange}
                required
                fullWidth
                variant="outlined"
                size="medium"
                error={!!formErrors.password}
                helperText={formErrors.password}
                disabled={loading}
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
                        disabled={loading}
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
                disabled={loading}
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                  mt: 1,
                  boxShadow: 2,
                  textTransform: "none",
                  fontSize: 18,
                  position: "relative",
                  transition: "all 0.2s ease-in-out",
                //   background: "linear-gradient(135deg, #1a237e 0%, #3949ab 100%)",
                //   "&:hover": {
                //     background: "linear-gradient(135deg, #0d1b5e 0%, #2c3e8f 100%)",
                //   }
                }}
                endIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <ArrowRightAltIcon sx={{ fontSize: 22 }} />
                  )
                }
              >
                {loading ? "Signing In..." : "Sign In as Admin"}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: 12 }}
          >
            🔒 Restricted access - Authorized personnel only
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
