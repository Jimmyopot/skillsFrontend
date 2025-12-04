/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  Autocomplete,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../../common/state/CommonActions";
import { setUserFromStorage } from "../../login/state/authSlice";

const availableSkills = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Backend Development",
  "Database Management",
  "Cloud Computing",
  "DevOps",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Project Management",
  "Quality Assurance",
];

const countries = [
  "Kenya",
  "Nigeria",
  "South Africa",
  "Ghana",
  "Tanzania",
  "Uganda",
  "Rwanda",
];

export default function UpdateProfilePopup({ open, handleClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const { updateProfile } = useSelector((state) => state.CommonReducer);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    cityOrTown: "",
    localityOrArea: "",
    skills: [],
    availableDate: "",
    availableTime: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (user && open) {
      let dateString = "";
      if (user.availableDate) {
        const date = new Date(user.availableDate);
        dateString = date.toISOString().split("T")[0];
      }

      let timeString = "09:00";
      if (user.availableTime) {
        // Extract HH:MM from time string (e.g., "09:00:00" -> "09:00")
        timeString = user.availableTime.substring(0, 5);
      }

      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "",
        cityOrTown: user.cityOrTown || "",
        localityOrArea: user.localityOrArea || "",
        skills: user.skills || [],
        availableDate: dateString,
        availableTime: timeString,
      });
      setErrors({});
      setIsFormChanged(false);
    }
  }, [user, open]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.cityOrTown.trim()) {
      newErrors.cityOrTown = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsFormChanged(true);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSkillsChange = (event, newValue) => {
    if (newValue.length <= 5) {
      setFormData((prev) => ({ ...prev, skills: newValue }));
      setIsFormChanged(true);
      if (errors.skills) {
        setErrors((prev) => ({ ...prev, skills: "" }));
      }
    } else {
      setErrors((prev) => ({ ...prev, skills: "Maximum 5 skills allowed" }));
    }
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        // Prepare profile data for API
        const profileData = {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: "", // Empty password means no change
          country: formData.country,
          cityOrTown: formData.cityOrTown,
          localityOrArea: formData.localityOrArea,
          skills: formData.skills,
          availableDate: formData.availableDate 
            ? new Date(formData.availableDate).toISOString() 
            : null,
          availableTime: formData.availableTime ? `${formData.availableTime}:00` : "09:00:00",
        };

        // Dispatch update action
        const result = await dispatch(
          updateProfileAction({
            userId: user.id || user.userId,
            profileData,
          })
        ).unwrap();

        // Update local storage with new user data
        if (result.user) {
          const updatedUser = { ...result.user, token: user.token };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          dispatch(setUserFromStorage(updatedUser));
        }

        // Close popup
        handleClose();
      } catch (error) {
        console.error("Failed to update profile:", error);
        setErrors({ submit: error.message || "Failed to update profile" });
      }
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() &&
      formData.email.trim() &&
      validateEmail(formData.email) &&
      formData.phoneNumber.trim() &&
      validatePhone(formData.phoneNumber) &&
      formData.country &&
      formData.cityOrTown.trim()
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Edit Profile
        </Typography>
        <IconButton onClick={handleCancel} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 1 }}>
          {/* Personal Information */}
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="bold"
          >
            Personal Information
          </Typography>

          <TextField
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName}
            fullWidth
            size="small"
          />

          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            size="small"
          />

          <TextField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            fullWidth
            size="small"
          />

          {/* Location */}
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="bold"
            sx={{ mt: 1 }}
          >
            Location
          </Typography>

          <Autocomplete
            options={countries}
            value={formData.country}
            onChange={(event, newValue) => {
              setFormData((prev) => ({ ...prev, country: newValue || "" }));
              setIsFormChanged(true);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                error={!!errors.country}
                helperText={errors.country}
                size="small"
              />
            )}
            fullWidth
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="City/Town"
                value={formData.cityOrTown}
                onChange={handleChange("cityOrTown")}
                error={!!errors.cityOrTown}
                helperText={errors.cityOrTown}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Locality/Area"
                value={formData.localityOrArea}
                onChange={handleChange("localityOrArea")}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>

          {/* Skills */}
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="bold"
            sx={{ mt: 1 }}
          >
            Skills (max 5)
          </Typography>

          <Autocomplete
            multiple
            options={availableSkills}
            value={formData.skills}
            onChange={handleSkillsChange}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={index}
                  sx={{ borderColor: "#4caf50", color: "#4caf50" }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={formData.skills.length < 5 ? "Add skills..." : ""}
                error={!!errors.skills}
                helperText={
                  errors.skills || `${formData.skills.length}/5 skills`
                }
                size="small"
              />
            )}
            fullWidth
          />

          {/* Availability */}
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="bold"
            sx={{ mt: 1 }}
          >
            Availability
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Available Date"
                type="date"
                value={formData.availableDate}
                onChange={handleChange("availableDate")}
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Available Time"
                type="time"
                value={formData.availableTime}
                onChange={handleChange("availableTime")}
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleCancel} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isFormValid() || !isFormChanged || updateProfile}
          startIcon={updateProfile ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{
            bgcolor: "#4caf50",
            "&:hover": { bgcolor: "#43a047" },
            "&:disabled": { bgcolor: "grey.300" },
          }}
        >
          {updateProfile ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
