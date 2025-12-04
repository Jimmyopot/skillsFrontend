// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   IconButton,
//   Typography,
//   TextField,
//   Grid,
//   Avatar,
//   Box,
//   Chip,
//   FormControl,
//   FormLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   Divider,
//   CircularProgress
// } from "@mui/material";
// import {
//   Close as CloseIcon,
//   Person as PersonIcon,
//   Star as StarIcon,
//   Upload as UploadIcon,
//   Check as CheckIcon,
//   Error as ErrorIcon
// } from "@mui/icons-material";

// export default function UpdateProfilePopup({ 
//   open, 
//   handleClose, 
//   editFormData = {
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     county: "",
//     locality: "",
//     skillsOffered: [],
//     skillsNeeded: [],
//     profilePicture: ""
//   },
//   setEditFormData = () => {},
//   formErrors = {},
//   setFormErrors = () => {},
//   handleSaveProfile = () => {},
//   handleAddSkill = () => {},
//   handleRemoveSkill = () => {},
//   isSaving = false,
//   saveSuccess = false,
//   KENYAN_COUNTIES = []
// }) {
  
//   // Helper function to get user initials
//   const getInitials = (name) => {
//     if (!name) return "U";
//     return name
//       .split(" ")
//       .map((part) => part.charAt(0))
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 2,
//           maxHeight: "90vh",
//           //   bgcolor: "primary.main2"
//         },
//       }}
//     >
//       {/* Dialog Header */}
//       <DialogTitle
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//           pb: 1,
//         }}
//       >
//         <Box>
//           <Typography variant="h5" component="h2" fontWeight="bold">
//             Edit Profile
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//             Update your profile information
//           </Typography>
//         </Box>
//         <IconButton
//           onClick={handleClose}
//           sx={{ mt: -1, mr: -1 }}
//           aria-label="Close modal"
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       {/* Dialog Content */}
//       <DialogContent sx={{ px: 3, py: 2 }}>
//         <Box
//           component="form"
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSaveProfile();
//           }}
//           sx={{
//             // display: "flex",
//             // flexDirection: "column",
//             // gap: 3,
//             width: "100%",
//           }}
//         >
//           {/* Profile Picture */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 2,
//               pb: 3,
//             }}
//           >
//             <Avatar
//               src={editFormData.profilePicture || "/placeholder.svg"}
//               alt="Profile"
//               sx={{
//                 width: 96,
//                 height: 96,
//                 border: 4,
//                 borderColor: "primary.main",
//                 borderOpacity: 0.2,
//                 fontSize: "2rem",
//               }}
//             >
//               {getInitials(editFormData.fullName)}
//             </Avatar>
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<UploadIcon />}
//               sx={{ textTransform: "none" }}
//             >
//               Change Photo
//             </Button>
//           </Box>

//           <Divider />

//           {/* Personal Information */}
//           <Box sx={{ width: "100%", display: "block" }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 fontWeight: 600,
//               }}
//             >
//               <PersonIcon color="primary" />
//               Personal Information
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 alignItems: "center",
//                 gap: 2,
//                 my: 3,
//                 width: "100%",
//               }}
//             >
//               <Box sx={{ width: "100%" }}>
//                 <TextField
//                   fullWidth
//                   id="fullName"
//                   label={
//                     <span>
//                       Full Name <span style={{ color: "red" }}>*</span>
//                     </span>
//                   }
//                   value={editFormData.fullName}
//                   onChange={(e) => {
//                     setEditFormData({
//                       ...editFormData,
//                       fullName: e.target.value,
//                     });
//                     if (formErrors.fullName) {
//                       setFormErrors({ ...formErrors, fullName: "" });
//                     }
//                   }}
//                   error={!!formErrors.fullName}
//                   helperText={
//                     formErrors.fullName && (
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
//                       >
//                         <ErrorIcon sx={{ fontSize: 16 }} />
//                         {formErrors.fullName}
//                       </Box>
//                     )
//                   }
//                 />
//               </Box>

//               <Box sx={{ width: "100%" }}>
//                 <TextField
//                   fullWidth
//                   id="email"
//                   type="email"
//                   label={
//                     <span>
//                       Email Address <span style={{ color: "red" }}>*</span>
//                     </span>
//                   }
//                   value={editFormData.email}
//                   onChange={(e) => {
//                     setEditFormData({
//                       ...editFormData,
//                       email: e.target.value,
//                     });
//                     if (formErrors.email) {
//                       setFormErrors({ ...formErrors, email: "" });
//                     }
//                   }}
//                   error={!!formErrors.email}
//                   helperText={
//                     formErrors.email && (
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
//                       >
//                         <ErrorIcon sx={{ fontSize: 16 }} />
//                         {formErrors.email}
//                       </Box>
//                     )
//                   }
//                 />
//               </Box>
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 alignItems: "center",
//                 gap: 2,
//                 my: 3,
//                 width: "100%",
//               }}
//             >
//               <Box sx={{ width: "100%" }}>
//                 <TextField
//                   fullWidth
//                   id="phoneNumber"
//                   type="tel"
//                   label={
//                     <span>
//                       Phone Number <span style={{ color: "red" }}>*</span>
//                     </span>
//                   }
//                   value={editFormData.phoneNumber}
//                   onChange={(e) => {
//                     setEditFormData({
//                       ...editFormData,
//                       phoneNumber: e.target.value,
//                     });
//                     if (formErrors.phoneNumber) {
//                       setFormErrors({ ...formErrors, phoneNumber: "" });
//                     }
//                   }}
//                   error={!!formErrors.phoneNumber}
//                   helperText={
//                     formErrors.phoneNumber && (
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
//                       >
//                         <ErrorIcon sx={{ fontSize: 16 }} />
//                         {formErrors.phoneNumber}
//                       </Box>
//                     )
//                   }
//                 />
//               </Box>

//               <Box sx={{ width: "100%" }}>
//                 <FormControl fullWidth error={!!formErrors.county}>
//                   {/* <FormLabel sx={{ mb: 1 }}>
//                     County <span style={{ color: "red" }}>*</span>
//                   </FormLabel> */}
//                   <Select
//                     id="county"
//                     value={editFormData.county}
//                     onChange={(e) => {
//                       setEditFormData({
//                         ...editFormData,
//                         county: e.target.value,
//                       });
//                       if (formErrors.county) {
//                         setFormErrors({ ...formErrors, county: "" });
//                       }
//                     }}
//                     displayEmpty
//                   >
//                     <MenuItem value="">
//                       <em>Select county</em>
//                     </MenuItem>
//                     {KENYAN_COUNTIES.filter((c) => c !== "All Counties").map(
//                       (county) => (
//                         <MenuItem key={county} value={county}>
//                           {county}
//                         </MenuItem>
//                       )
//                     )}
//                   </Select>
//                   {formErrors.county && (
//                     <FormHelperText>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
//                       >
//                         <ErrorIcon sx={{ fontSize: 16 }} />
//                         {formErrors.county}
//                       </Box>
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               </Box>
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 alignItems: "center",
//                 // gap: 2,
//                 my: 3,
//                 width: "100%",
//               }}
//             >
//               <Box sx={{ width: "100%" }}>
//                 <TextField
//                   fullWidth
//                   id="locality"
//                   label={
//                     <span>
//                       Locality/Area <span style={{ color: "red" }}>*</span>
//                     </span>
//                   }
//                   value={editFormData.locality}
//                   onChange={(e) => {
//                     setEditFormData({
//                       ...editFormData,
//                       locality: e.target.value,
//                     });
//                     if (formErrors.locality) {
//                       setFormErrors({ ...formErrors, locality: "" });
//                     }
//                   }}
//                   placeholder="e.g., Westlands, Karen, CBD"
//                   error={!!formErrors.locality}
//                   helperText={
//                     formErrors.locality && (
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
//                       >
//                         <ErrorIcon sx={{ fontSize: 16 }} />
//                         {formErrors.locality}
//                       </Box>
//                     )
//                   }
//                 />
//               </Box>
//             </Box>
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           {/* Skills Section */}
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 fontWeight: 600,
//               }}
//             >
//               <StarIcon color="primary" />
//               Skills & Expertise
//             </Typography>

//             {/* Skills Offered */}
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               <FormLabel>
//                 Skills I Offer <span style={{ color: "red" }}>*</span>
//               </FormLabel>
//               <TextField
//                 fullWidth
//                 id="skillsOffered"
//                 placeholder="Type a skill and press Enter"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     handleAddSkill("offered", e.target.value);
//                     e.target.value = "";
//                   }
//                 }}
//                 error={!!formErrors.skillsOffered}
//                 helperText={
//                   formErrors.skillsOffered && (
//                     <Box
//                       sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
//                     >
//                       <ErrorIcon sx={{ fontSize: 16 }} />
//                       {formErrors.skillsOffered}
//                     </Box>
//                   )
//                 }
//               />
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
//                 {editFormData.skillsOffered.map((skill) => (
//                   <Chip
//                     key={skill}
//                     label={skill}
//                     onDelete={() => handleRemoveSkill("offered", skill)}
//                     color="primary"
//                     variant="outlined"
//                     sx={{
//                       backgroundColor: "primary.50",
//                       "&:hover": {
//                         backgroundColor: "primary.100",
//                       },
//                     }}
//                   />
//                 ))}
//               </Box>
//             </Box>

//             {/* Skills Needed */}
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               <FormLabel>Skills I Need</FormLabel>
//               <TextField
//                 fullWidth
//                 id="skillsNeeded"
//                 placeholder="Type a skill and press Enter"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     handleAddSkill("needed", e.target.value);
//                     e.target.value = "";
//                   }
//                 }}
//               />
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
//                 {editFormData.skillsNeeded.map((skill) => (
//                   <Chip
//                     key={skill}
//                     label={skill}
//                     onDelete={() => handleRemoveSkill("needed", skill)}
//                     variant="outlined"
//                     color="primary"
//                     sx={{
//                       "&:hover": {
//                         backgroundColor: "primary.50",
//                       },
//                     }}
//                   />
//                 ))}
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </DialogContent>

//       {/* Dialog Actions */}
//       <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
//         <Button
//           variant="outlined"
//           onClick={handleClose}
//           disabled={isSaving}
//           sx={{ minWidth: 100 }}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           onClick={handleSaveProfile}
//           disabled={isSaving}
//           sx={{ minWidth: 120 }}
//           startIcon={
//             isSaving ? (
//               <CircularProgress size={16} color="inherit" />
//             ) : saveSuccess ? (
//               <CheckIcon />
//             ) : (
//               <CheckIcon />
//             )
//           }
//         >
//           {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }













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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

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

export default function UpdateProfilePopup({ open, handleClose, userData, onSave }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    locality: "",
    skills: [],
    availableDate: "",
    availableTime: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (userData && open) {
      let dateString = "";
      if (userData.availableDate) {
        const date = new Date(userData.availableDate);
        dateString = date.toISOString().split("T")[0];
      }

      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country: userData.country || "",
        city: userData.city || "",
        locality: userData.locality || "",
        skills: userData.skills || [],
        availableDate: dateString,
        availableTime: userData.availableTime || "09:00",
      });
      setErrors({});
      setIsFormChanged(false);
    }
  }, [userData, open]);

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

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
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

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...formData,
        availableDate: formData.availableDate
          ? new Date(formData.availableDate)
          : null,
      });
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
      formData.phone.trim() &&
      validatePhone(formData.phone) &&
      formData.country &&
      formData.city.trim()
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
            value={formData.phone}
            onChange={handleChange("phone")}
            error={!!errors.phone}
            helperText={errors.phone}
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
                value={formData.city}
                onChange={handleChange("city")}
                error={!!errors.city}
                helperText={errors.city}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Locality/Area"
                value={formData.locality}
                onChange={handleChange("locality")}
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
          disabled={!isFormValid() || !isFormChanged}
          sx={{
            bgcolor: "#4caf50",
            "&:hover": { bgcolor: "#43a047" },
            "&:disabled": { bgcolor: "grey.300" },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
