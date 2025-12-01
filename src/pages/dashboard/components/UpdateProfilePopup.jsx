import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  TextField,
  Grid,
  Avatar,
  Box,
  Chip,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  CircularProgress
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Star as StarIcon,
  Upload as UploadIcon,
  Check as CheckIcon,
  Error as ErrorIcon
} from "@mui/icons-material";

export default function UpdateProfilePopup({ 
  open, 
  handleClose, 
  editFormData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    county: "",
    locality: "",
    skillsOffered: [],
    skillsNeeded: [],
    profilePicture: ""
  },
  setEditFormData = () => {},
  formErrors = {},
  setFormErrors = () => {},
  handleSaveProfile = () => {},
  handleAddSkill = () => {},
  handleRemoveSkill = () => {},
  isSaving = false,
  saveSuccess = false,
  KENYAN_COUNTIES = []
}) {
  
  // Helper function to get user initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "90vh",
          //   bgcolor: "primary.main2"
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Edit Profile
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Update your profile information
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{ mt: -1, mr: -1 }}
          aria-label="Close modal"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveProfile();
          }}
          sx={{
            // display: "flex",
            // flexDirection: "column",
            // gap: 3,
            width: "100%",
          }}
        >
          {/* Profile Picture */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              pb: 3,
            }}
          >
            <Avatar
              src={editFormData.profilePicture || "/placeholder.svg"}
              alt="Profile"
              sx={{
                width: 96,
                height: 96,
                border: 4,
                borderColor: "primary.main",
                borderOpacity: 0.2,
                fontSize: "2rem",
              }}
            >
              {getInitials(editFormData.fullName)}
            </Avatar>
            <Button
              variant="outlined"
              size="small"
              startIcon={<UploadIcon />}
              sx={{ textTransform: "none" }}
            >
              Change Photo
            </Button>
          </Box>

          <Divider />

          {/* Personal Information */}
          <Box sx={{ width: "100%", display: "block" }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 600,
              }}
            >
              <PersonIcon color="primary" />
              Personal Information
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 2,
                my: 3,
                width: "100%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  id="fullName"
                  label={
                    <span>
                      Full Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={editFormData.fullName}
                  onChange={(e) => {
                    setEditFormData({
                      ...editFormData,
                      fullName: e.target.value,
                    });
                    if (formErrors.fullName) {
                      setFormErrors({ ...formErrors, fullName: "" });
                    }
                  }}
                  error={!!formErrors.fullName}
                  helperText={
                    formErrors.fullName && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <ErrorIcon sx={{ fontSize: 16 }} />
                        {formErrors.fullName}
                      </Box>
                    )
                  }
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label={
                    <span>
                      Email Address <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={editFormData.email}
                  onChange={(e) => {
                    setEditFormData({
                      ...editFormData,
                      email: e.target.value,
                    });
                    if (formErrors.email) {
                      setFormErrors({ ...formErrors, email: "" });
                    }
                  }}
                  error={!!formErrors.email}
                  helperText={
                    formErrors.email && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <ErrorIcon sx={{ fontSize: 16 }} />
                        {formErrors.email}
                      </Box>
                    )
                  }
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 2,
                my: 3,
                width: "100%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  type="tel"
                  label={
                    <span>
                      Phone Number <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={editFormData.phoneNumber}
                  onChange={(e) => {
                    setEditFormData({
                      ...editFormData,
                      phoneNumber: e.target.value,
                    });
                    if (formErrors.phoneNumber) {
                      setFormErrors({ ...formErrors, phoneNumber: "" });
                    }
                  }}
                  error={!!formErrors.phoneNumber}
                  helperText={
                    formErrors.phoneNumber && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <ErrorIcon sx={{ fontSize: 16 }} />
                        {formErrors.phoneNumber}
                      </Box>
                    )
                  }
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <FormControl fullWidth error={!!formErrors.county}>
                  {/* <FormLabel sx={{ mb: 1 }}>
                    County <span style={{ color: "red" }}>*</span>
                  </FormLabel> */}
                  <Select
                    id="county"
                    value={editFormData.county}
                    onChange={(e) => {
                      setEditFormData({
                        ...editFormData,
                        county: e.target.value,
                      });
                      if (formErrors.county) {
                        setFormErrors({ ...formErrors, county: "" });
                      }
                    }}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>Select county</em>
                    </MenuItem>
                    {KENYAN_COUNTIES.filter((c) => c !== "All Counties").map(
                      (county) => (
                        <MenuItem key={county} value={county}>
                          {county}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {formErrors.county && (
                    <FormHelperText>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <ErrorIcon sx={{ fontSize: 16 }} />
                        {formErrors.county}
                      </Box>
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                // gap: 2,
                my: 3,
                width: "100%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  id="locality"
                  label={
                    <span>
                      Locality/Area <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={editFormData.locality}
                  onChange={(e) => {
                    setEditFormData({
                      ...editFormData,
                      locality: e.target.value,
                    });
                    if (formErrors.locality) {
                      setFormErrors({ ...formErrors, locality: "" });
                    }
                  }}
                  placeholder="e.g., Westlands, Karen, CBD"
                  error={!!formErrors.locality}
                  helperText={
                    formErrors.locality && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <ErrorIcon sx={{ fontSize: 16 }} />
                        {formErrors.locality}
                      </Box>
                    )
                  }
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Skills Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 600,
              }}
            >
              <StarIcon color="primary" />
              Skills & Expertise
            </Typography>

            {/* Skills Offered */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>
                Skills I Offer <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <TextField
                fullWidth
                id="skillsOffered"
                placeholder="Type a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill("offered", e.target.value);
                    e.target.value = "";
                  }
                }}
                error={!!formErrors.skillsOffered}
                helperText={
                  formErrors.skillsOffered && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <ErrorIcon sx={{ fontSize: 16 }} />
                      {formErrors.skillsOffered}
                    </Box>
                  )
                }
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {editFormData.skillsOffered.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => handleRemoveSkill("offered", skill)}
                    color="primary"
                    variant="outlined"
                    sx={{
                      backgroundColor: "primary.50",
                      "&:hover": {
                        backgroundColor: "primary.100",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Skills Needed */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>Skills I Need</FormLabel>
              <TextField
                fullWidth
                id="skillsNeeded"
                placeholder="Type a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill("needed", e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {editFormData.skillsNeeded.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => handleRemoveSkill("needed", skill)}
                    variant="outlined"
                    color="primary"
                    sx={{
                      "&:hover": {
                        backgroundColor: "primary.50",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          disabled={isSaving}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveProfile}
          disabled={isSaving}
          sx={{ minWidth: 120 }}
          startIcon={
            isSaving ? (
              <CircularProgress size={16} color="inherit" />
            ) : saveSuccess ? (
              <CheckIcon />
            ) : (
              <CheckIcon />
            )
          }
        >
          {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
