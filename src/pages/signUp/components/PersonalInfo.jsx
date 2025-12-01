// @ts-nocheck
import { 
  Box, 
  TextField, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Alert,
  Button
} from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PersonalInfo = ({
  currentStep,
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordStrength,
  strengthLabels,
  errors,
  setErrors, // ✅ Add this prop
  agreedToTC,
  setAgreedToTC,
  setShowTCModal,
}) => {
  return (
    <Box>
      {currentStep === 1 && (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              fullWidth
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                if (errors.firstName && e.target.value.trim()) {
                  setErrors({ ...errors, firstName: "" });
                }
              }}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
            />

            <TextField
              fullWidth
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                if (errors.lastName && e.target.value.trim()) {
                  setErrors({ ...errors, lastName: "" });
                }
              }}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData?.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                // ✅ Clear error when valid email is entered
                if (errors.email && /\S+@\S+\.\S+/.test(e.target.value)) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
            />

            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              placeholder="+254 700 000 000"
              value={formData?.phoneNumber}
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e.target.value });
                // ✅ Clear error when valid phone number is entered
                if (
                  errors.phoneNumber &&
                  /^\+?\d{7,15}$/.test(e.target.value)
                ) {
                  setErrors({ ...errors, phoneNumber: "" });
                }
              }}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
            />

            {/* <Typography variant="caption" color="textSecondary">
            Password should be at least 8 characters, include an uppercase
            letter, a number, and a special character.
          </Typography> */}

            {formData.password && (
              <Box sx={{ mb: -1 }}>
                <Box sx={{ display: "flex", gap: 0, mb: 1 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        height: 8,
                        flex: 1,
                        borderRadius: 1,
                        bgcolor:
                          i < passwordStrength
                            ? passwordStrength === 1
                              ? "error.main"
                              : passwordStrength === 2
                              ? "warning.main"
                              : passwordStrength === 3
                              ? "warning.light"
                              : "success.main"
                            : "grey.200",
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="textSecondary">
                  Password strength:{" "}
                  {strengthLabels[passwordStrength - 1] || "Too weak"}
                </Typography>
              </Box>
            )}

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                // ✅ Clear error when password is entered
                if (errors.password && e.target.value) {
                  setErrors({ ...errors, password: "" });
                }
              }}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="body2" color="textSecondary" sx={{ mt: -2 }}>
              Password Requirements:
              <br />
              - 8+ characters
              <br />
              - 1 uppercase letter (A-Z)
              <br />
              - 1 number (0-9)
              <br />
              - 1 special character (!@#$%^&*)
              <br />
            </Typography>

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                });
                // ✅ Clear error when passwords match
                if (
                  errors.confirmPassword &&
                  e.target.value === formData.password
                ) {
                  setErrors({ ...errors, confirmPassword: "" });
                }
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <Typography variant="body2" sx={{ color: "error.main" }}>
                  Passwords do not match
                </Typography>
              )}
          </Box>

          <Box sx={{ mt: 3 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#FCF5E6",
                border: "1px solid #F0E68C",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedToTC}
                    onChange={(e) => setAgreedToTC(e.target.checked)}
                    sx={{
                      color: "#0A6802",
                      "&.Mui-checked": {
                        color: "#0A6802",
                      },
                      alignSelf: "flex-start",
                      mt: -0.5,
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: "text.primary",
                      cursor: "pointer",
                    }}
                  >
                    I have read and agree to the{" "}
                    <Button
                      variant="text"
                      onClick={() => setShowTCModal(true)}
                      sx={{
                        p: 0,
                        minWidth: "auto",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        textDecoration: "underline",
                        color: "#0A6802",
                        textTransform: "none",
                        "&:hover": {
                          textDecoration: "none",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Terms and Conditions
                    </Button>
                    <Typography
                      component="span"
                      sx={{ color: "error.main", ml: 0.5 }}
                    >
                      *
                    </Typography>
                  </Typography>
                }
                sx={{
                  alignItems: "flex-start",
                  mb: 0,
                }}
              />
              {!agreedToTC && currentStep === 1 && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "error.main",
                    fontSize: "0.75rem",
                    // mt: 1,
                    display: "block",
                    ml: 4,
                  }}
                >
                  You must agree to the Terms and Conditions to continue
                </Typography>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PersonalInfo;
