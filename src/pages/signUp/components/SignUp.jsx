import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonalInfo from "./PersonalInfo";
import Skills from "./Skills";
import Availability from "./Availability";
import Location from "./Location";
import { useDispatch, useSelector } from "react-redux";
import { signupAction, checkUserUniqueAction } from "../state/SignUpActions";
import { clearUniquenessCheck } from "../state/SignUpSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../common/snackbar/SnackbarContext";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

export default function NipeNikupeRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // for navigation after signup
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [customSkill, setCustomSkill] = useState("");
  const [errors, setErrors] = useState({});
  const [agreedToTC, setAgreedToTC] = useState(false);
  const [showTCModal, setShowTCModal] = useState(false);
  const { showSnackbar } = useSnackbar();

  const {
    signup,
    checkingUniqueness,
    uniquenessError,
    emailConflict,
    phoneConflict,
  } = useSelector((state) => state.SignUpReducer);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    country: "",
    cityOrTown: "",
    localityOrArea: "",
    skills: [],
    availableDate: "",
    availableTime: "",
  });

  const validateStep = () => {
    let newErrors = {};

    if (currentStep === 1) {
      // ✅ Personal Info
      if (!formData.firstName.trim()) {
        newErrors.firstName = "*First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "*Last name is required";
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "*Enter a valid email address";
      }
      if (!/^\+?\d{7,15}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "*Enter a valid phone number";
      }
      if (!formData.password) {
        newErrors.password = "*Password is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "*Passwords do not match";
      }
      if (!agreedToTC) {
        newErrors.agreedToTC = "*You must agree to the Terms and Conditions";
      }
    }

    // if (currentStep === 2) {
    //   // ✅ Location
    //   if (!formData.country) newErrors.country = "Country is required";
    //   if (!formData.cityOrTown) newErrors.cityOrTown = "City/Town is required";
    //   if (!formData.localityOrArea)
    //     newErrors.localityOrArea = "Locality/Area is required";
    // }

    if (currentStep === 2) {
      if (!formData.country) newErrors.country = "Country is required";

      if (formData.country === "Kenya") {
        if (!formData.cityOrTown) newErrors.cityOrTown = "County is required";
      } else {
        if (!formData.localityOrArea)
          newErrors.localityOrArea = "Town/City is required";
      }
    }

    if (currentStep === 3) {
      // ✅ Skills
      if (!formData.skills || formData.skills.length < 1) {
        newErrors.skills = "Please select at least one skill";
      }
    }

    if (currentStep === 4) {
      // ✅ Availability
      if (!formData.availableDate) {
        newErrors.availableDate = "Please select a date";
      }
      if (!formData.availableTime) {
        newErrors.availableTime = "Please select a time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Function to check if user is unique
  const checkUserUniqueness = () => {
    return new Promise((resolve, reject) => {
      dispatch(
        checkUserUniqueAction({
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          onSuccess: (response) => {
            resolve(response);
          },
          onFailure: ({ message, errorData, status }) => {
            // Set specific error messages based on conflicts
            let newErrors = {};
            if (errorData?.emailConflict) {
              newErrors.email = "This email is already registered";
            }
            if (errorData?.phoneConflict) {
              newErrors.phoneNumber = "This phone number is already registered";
            }

            setErrors((prev) => ({
              ...prev,
              ...newErrors,
            }));

            reject({ message, errorData, status });
          },
        }),
      );
    });
  };

  const handleNext = async () => {
    // First validate the current step
    if (!validateStep()) {
      return;
    }

    // If we're on step 1 (Personal Info), check user uniqueness before proceeding
    if (currentStep === 1) {
      try {
        // Clear any previous uniqueness errors
        dispatch(clearUniquenessCheck());

        // Check if user is unique
        await checkUserUniqueness();

        // If we get here, user is unique, proceed to next step
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // User is not unique, errors have been set, don't proceed
        return;
      }
    }

    // Proceed to next step
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handleSkillToggle = (skill) => {
  //   setFormData((fd) => {
  //     const current = fd.skills || [];
  //     const updated = current.includes(skill)
  //       ? current.filter((s) => s !== skill)
  //       : [...current, skill];
  //     return { ...fd, skills: updated };
  //   });
  // };

  const addCustomSkill = () => {
    const name = customSkill.trim();
    if (!name) return;
    setFormData((fd) => {
      const current = fd.skills || [];
      if (current.includes(name)) return fd;
      const updated = [...current, name];
      return { ...fd, skills: updated };
    });
    setCustomSkill("");
  };

  // const handleAvailabilityToggle = (day, timeSlot) => {
  //   setAvailability((prev) => ({
  //     ...prev,
  //     [day]: prev[day]?.includes(timeSlot)
  //       ? prev[day].filter((slot) => slot !== timeSlot)
  //       : [...(prev[day] || []), timeSlot],
  //   }));
  // };

  // Function to clear uniqueness errors when user modifies email/phone
  // const handleFormDataChange = (field, value) => {
  //   // Update form data
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));

  //   // Clear uniqueness errors when user changes email or phone
  //   if (field === "email" || field === "phoneNumber") {
  //     dispatch(clearUniquenessCheck());

  //     // Clear specific field errors
  //     setErrors((prev) => {
  //       const newErrors = { ...prev };
  //       if (field === "email") {
  //         delete newErrors.email;
  //       }
  //       if (field === "phoneNumber") {
  //         delete newErrors.phoneNumber;
  //       }
  //       return newErrors;
  //     });
  //   }
  // };

  const handleSubmit = () => {
    if (!validateStep()) return;

    // ✅ validation: check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ✅ exclude confirmPassword from payload
    const { firstName, lastName, ...cleanFormData } = formData;

    const payload = {
      ...cleanFormData,
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      skills: formData.skills, // now synced
      availableDate: formData.availableDate,
      availableTime: formData.availableTime,
    };

    dispatch(
      signupAction({
        formData: payload,
        onSuccess: () => {
          showSnackbar(
            "Registration successful! Please log in waiting for you...",
            "success",
          );
          setTimeout(() => {
            navigate("/login");
          }, 500);
        },
        onFailure: (errorMessage) => {
          console.error("❌ Signup failed:", errorMessage);
          setErrors((prev) => ({ ...prev, apiError: errorMessage })); // store API error
        },
      }),
    );
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F0FCF0", position: "relative" }}>
      {/* Subtle Back to Home Button */}
      <Button
        onClick={() => navigate("/")}
        startIcon={<ArrowBackIcon />}
        sx={{
          position: "absolute",
          top: { xs: 16, md: 24 },
          // bottom: { xs: "auto", md: 24 },
          left: { xs: 16, md: 24 },
          color: "text.secondary",
          textTransform: "none",
          fontSize: { xs: 14, md: 15 },
          fontWeight: 500,
          zIndex: 10,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            color: "primary.main",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            transform: "translateX(-2px)",
          },
        }}
      >
        <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
          Back to Home
        </Box>
        <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
          Home
        </Box>
      </Button>

      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 8 }}>
        <Box sx={{ maxWidth: 700, mx: "auto" }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 1, color: "#213547", fontSize: 32, }}
            >
              Welcome to NipeNikupe
            </Typography>
            <Typography sx={{ color: "grey.600" }}>
              Join our community of skill exchangers and start bartering your
              talents today!
            </Typography>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#0A6802" }}
              >
                Step {currentStep} of {totalSteps}
              </Typography>
              <Typography variant="body2" sx={{ color: "grey.500" }}>
                {Math.round(progress)}% Complete
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 4, bgcolor: "#E5F4E4" }}
            />
          </Box>

          {/* Step Indicators */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            {[
              { step: 1, icon: PersonIcon, label: "Personal Info" },
              { step: 2, icon: PlaceIcon, label: "Location" },
              { step: 3, icon: WorkIcon, label: "Skills" },
              { step: 4, icon: CalendarTodayIcon, label: "Availability" },
              // eslint-disable-next-line no-unused-vars
            ].map(({ step, icon: IconComponent, label }) => (
              <Box
                key={step}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                    bgcolor: step <= currentStep ? "#0A6802" : "grey.200",
                    color: step <= currentStep ? "white" : "grey.500",
                  }}
                >
                  {step < currentStep ? (
                    <CheckCircleIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <IconComponent sx={{ fontSize: 20 }} />
                  )}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: "center",
                    fontWeight: step <= currentStep ? 500 : 400,
                    color: step <= currentStep ? "#0A6802" : "grey.500",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Form Card */}
          <Card sx={{ boxShadow: 6, borderRadius: 3 }}>
            <CardHeader sx={{ bgcolor: "#FCF5E6", textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#0A6802" }}
              >
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Your Location"}
                {currentStep === 3 && "Skills You Can Offer"}
                {currentStep === 4 && "Availability & Preferences"}
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.600", mt: 1 }}>
                {currentStep === 1 &&
                  "Let's start with some basic information about you"}
                {currentStep === 2 &&
                  "Help others find you by sharing your location"}
                {currentStep === 3 &&
                  "What talents and services can you provide to others?"}
                {currentStep === 4 &&
                  "When are you typically available for skill exchanges?"}
              </Typography>
            </CardHeader>
            <CardContent sx={{ p: 4 }}>
              {/* <form onSubmit={handleSubmit}> */}
              {/* Step 1: Personal Information */}
              <PersonalInfo
                currentStep={currentStep}
                formData={formData}
                setFormData={setFormData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                passwordStrength={passwordStrength}
                strengthLabels={strengthLabels}
                errors={errors}
                setErrors={setErrors}
                agreedToTC={agreedToTC}
                setAgreedToTC={setAgreedToTC}
                setShowTCModal={setShowTCModal}
              />

              {/* Step 2: Location */}
              <Location
                currentStep={currentStep}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />

              {/* Step 3: Skills */}
              <Skills
                currentStep={currentStep}
                formData={formData}
                setFormData={setFormData}
                customSkill={customSkill}
                setCustomSkill={setCustomSkill}
                addCustomSkill={addCustomSkill}
                errors={errors}
                setErrors={setErrors}
              />

              {/* Step 4: Availability */}
              <Availability
                currentStep={currentStep}
                // handleAvailabilityToggle={handleAvailabilityToggle}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />

              {/* Display Uniqueness Check Errors */}
              {(emailConflict || phoneConflict || uniquenessError) && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: "",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "error.main",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="error.dark"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Registration Issues:
                  </Typography>
                  {emailConflict && (
                    <Typography
                      variant="body2"
                      color="error.dark"
                      sx={{ mb: 0.5 }}
                    >
                      • Email address is already registered
                    </Typography>
                  )}
                  {phoneConflict && (
                    <Typography
                      variant="body2"
                      color="error.dark"
                      sx={{ mb: 0.5 }}
                    >
                      • Phone number is already registered
                    </Typography>
                  )}
                  {uniquenessError && !emailConflict && !phoneConflict && (
                    <Typography variant="body2" color="error.dark">
                      •{" "}
                      {uniquenessError.message ||
                        "Unable to verify account uniqueness"}
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    color="error.dark"
                    sx={{ mt: 1, display: "block" }}
                  >
                    Please use different credentials or login if you already
                    have an account.
                  </Typography>
                </Box>
              )}

              {/* Show loading state for uniqueness check */}
              {checkingUniqueness && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: "info.light",
                    borderRadius: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" color="info.dark">
                    🔍 Checking if email and phone number are available...
                  </Typography>
                </Box>
              )}

              {/* Navigation Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 4,
                  pt: 3,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  sx={{ borderRadius: 2 }}
                >
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      checkingUniqueness || (currentStep === 1 && !agreedToTC)
                    }
                    sx={{
                      borderRadius: 2,
                      bgcolor: "#0A6802",
                      "&:hover": { bgcolor: "#085a01" },
                    }}
                  >
                    {checkingUniqueness && currentStep === 1
                      ? "Checking availability..."
                      : "Next Step"}
                  </Button>
                ) : (
                  <Button
                    // type="submit"
                    type="button" // not submit anymore
                    onClick={handleSubmit} // ✅ directly call your submit logic
                    variant="contained"
                    // disabled={signup}
                    disabled={
                      signup || // still disable if loading
                      !formData.availableDate || // disable if date not selected
                      !formData.availableTime // disable if time not selected
                    }
                    sx={{
                      borderRadius: 2,
                      bgcolor: "#0A6802",
                      "&:hover": { bgcolor: "#085a01" },
                    }}
                  >
                    {signup ? "Registering..." : "Complete Registration"}
                  </Button>
                )}
              </Box>
              {/* </form> */}
            </CardContent>
          </Card>

          {/* Terms & Privacy Dialog */}
          <Dialog
            open={showTCModal}
            onClose={() => setShowTCModal(false)}
            fullWidth
            maxWidth="md"
            aria-labelledby="tnc-privacy-dialog-title"
          >
            <DialogTitle sx={{ pr: 4 }} id="tnc-privacy-dialog-title">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Nipenikupe App Privacy Policy
                  </Typography>
                  <Typography variant="caption">
                    Effective Date: 22 October 2025
                  </Typography>
                </Box>
                <IconButton
                  aria-label="close"
                  onClick={() => setShowTCModal(false)}
                  size="large"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent
              dividers
              sx={{ maxHeight: "65vh", overflowY: "auto", py: 2 }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" paragraph>
                  Nipenikupe (“we”, “us”, “our”) is committed to protecting your
                  privacy and handling your personal data in accordance with the
                  Data Protection Act, 2019 (Kenya). This Privacy Policy
                  explains how we collect, use, store, and protect your
                  information.
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                1. Information We Collect
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Personal details: Name, email address, phone number, age, gender." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Profile information: Skills offered, skills sought, profile photo, biography." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Usage data: App activity, messages, feedback, and transaction history." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Device information: IP address, device type, operating system, and browser type." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Location data: If you enable location services." />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                2. How We Use Your Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Create and manage your account." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Facilitate skill-sharing and barter transactions." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Communicate with you about your account or activity." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Improve our services and user experience." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Ensure security and prevent fraud." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Comply with legal obligations." />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                3. Legal Basis for Processing
              </Typography>
              <Typography paragraph>
                We process your personal data based on: your consent; the
                necessity to perform a contract with you; compliance with legal
                obligations; and our legitimate interests (e.g., improving our
                services).
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                4. Sharing Your Information
              </Typography>
              <Typography paragraph>
                We may share your information with other users (as necessary for
                skill exchanges), service providers who help us operate the
                platform (under strict confidentiality), and law enforcement or
                regulatory authorities if required by law. We do NOT sell your
                personal data to third parties.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                5. Data Security
              </Typography>
              <Typography paragraph>
                We implement appropriate technical and organisational measures
                to protect your data from unauthorised access, loss, or misuse.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                6. Data Retention
              </Typography>
              <Typography paragraph>
                We retain your personal data only as long as necessary for the
                purposes described in this policy or as required by law.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                7. Your Rights
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Access your personal data." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Request correction or deletion of your data." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Object to or restrict processing." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Withdraw consent at any time." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Request data portability." />
                </ListItem>
              </List>
              <Typography paragraph>
                To exercise your rights, contact us at: [Insert Contact
                Email/Address].
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                8. Children’s Privacy
              </Typography>
              <Typography paragraph>
                We do not knowingly collect personal data from children under 18
                without parental or guardian consent.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                9. International Data Transfers
              </Typography>
              <Typography paragraph>
                If we transfer your data outside Kenya, we will ensure adequate
                safeguards are in place as required by law.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                10. Changes to This Policy
              </Typography>
              <Typography paragraph>
                We may update this Privacy Policy from time to time. We will
                notify you of significant changes and indicate the effective
                date at the top of the policy.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mt: 1 }}
              >
                11. Contact Us
              </Typography>
              <Typography paragraph>
                If you have any questions or concerns about this Privacy Policy
                or your data, please contact us at: [Insert Contact
                Email/Address].
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Nipenikupe – Terms and Conditions – V1.0 (22 October 2025)
                </Typography>
                <Typography paragraph>
                  1. Acceptance of Terms: By registering for and using
                  Nipenikupe, you agree to abide by these Terms and Conditions
                  and any future updates.
                </Typography>
                <Typography paragraph>
                  2. Eligibility: You must be at least 18 years old (or the
                  legal age in your jurisdiction) to use the platform.
                </Typography>
                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  3. User Accounts
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="You are responsible for maintaining the confidentiality of your account credentials." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="You agree to provide accurate and up-to-date information." />
                  </ListItem>
                </List>
                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  4. Skill Sharing and Barter
                </Typography>
                <Typography paragraph>
                  i. Platform-Only Exchanges: All skill-sharing and barter
                  transactions must be initiated, negotiated, and completed
                  exclusively through the Nipenikupe platform. Users are
                  strictly prohibited from arranging or conducting exchanges
                  outside the platform.
                </Typography>
                <Typography paragraph>
                  ii. Prohibition of Monetary Transactions: The Nipenikupe
                  platform is designed solely for the exchange of skills and
                  services on a barter basis. Users must not request, offer, or
                  accept any form of monetary payment, including cash, mobile
                  money, or bank transfers, in connection with any skill
                  exchange arranged through the platform.
                </Typography>
                <Typography paragraph>
                  iii. Accurate Skill Descriptions: Users are required to
                  provide honest, clear, and accurate descriptions of the skills
                  or services they offer and those they seek. Misrepresentation
                  of skills, qualifications, or experience is strictly
                  prohibited and may result in suspension or termination of your
                  account.
                </Typography>
                <Typography paragraph>
                  iv. Commitment to Agreements: By agreeing to a skill exchange,
                  users commit to fulfilling their part of the arrangement to
                  the best of their ability and within the agreed timeframe.
                  Repeated failure to honour agreements may result in account
                  suspension.
                </Typography>
                <Typography paragraph>
                  v. No Unauthorised Commercial Activity: Users must not use the
                  platform to promote, advertise, or solicit for any commercial
                  services, products, or businesses unrelated to skill sharing
                  and barter.
                </Typography>
                <Typography paragraph>
                  vi. Reporting Violations: Users are encouraged to report any
                  attempts to circumvent the platform, requests for payment, or
                  other violations of these terms using the in-app reporting
                  tools.
                </Typography>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  5. Prohibited Conduct
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Do not share personal contact information (e.g., phone numbers, emails, social media) within the app." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Do not use the platform for illegal, harmful, or offensive activities." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Do not attempt to circumvent the platform’s communication or exchange systems." />
                  </ListItem>
                </List>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  6. Content and Communication
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="You are responsible for all content you post or share." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Do not post false, misleading, or inappropriate content." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="The platform may monitor communications to enforce these terms." />
                  </ListItem>
                </List>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  7. Privacy
                </Typography>
                <Typography paragraph>
                  {" "}
                  Your data will be handled in accordance with our Privacy
                  Policy. Do not share others’ personal information without
                  consent.
                </Typography>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  8. Dispute Resolution
                </Typography>
                <Typography paragraph>
                  Users are encouraged to resolve disputes amicably. The
                  platform may intervene at its discretion but is not liable for
                  user conduct.
                </Typography>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  9. Termination
                </Typography>
                <Typography paragraph>
                  The platform reserves the right to suspend or terminate
                  accounts that violate these terms.
                </Typography>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  10. Limitation of Liability
                </Typography>
                <Typography paragraph>
                  The platform is not responsible for the outcome of skill
                  exchanges or user conduct. Use the platform at your own risk.
                </Typography>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  11. Changes to Terms
                </Typography>
                <Typography paragraph>
                  Terms may be updated from time to time. Continued use
                  constitutes acceptance of changes.
                </Typography>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  12. Intellectual Property
                </Typography>
                <Typography paragraph>
                  All content posted by users remains the property of the
                  respective user. By posting, you grant Nipenikupe a
                  non-exclusive, royalty-free, worldwide licence to use such
                  content for operating and promoting the platform.
                </Typography>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  13. Indemnity
                </Typography>
                <Typography paragraph>
                  You agree to indemnify, defend, and hold harmless Nipenikupe,
                  its affiliates, officers, directors, employees, and agents
                  from claims arising out of your use of the platform.
                </Typography>

                <Typography paragraph sx={{ fontWeight: "bold" }}>
                  14. Jurisdiction
                </Typography>
                <Typography paragraph>
                  These Terms and Conditions are governed by and construed in
                  accordance with the laws of Kenya. Any disputes shall be
                  subject to the exclusive jurisdiction of the courts of Kenya.
                </Typography>

                <Typography paragraph sx={{ textAlign: "right", mt: 3 }}>
                  xxxx – 22nd October 2025 - xxxxx
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setShowTCModal(false)}
                sx={{ color: "#0A6802" }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Motivational Message */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" sx={{ color: "grey.600" }}>
              {currentStep === 1 &&
                "Just getting started! This will only take a few minutes."}
              {currentStep === 2 &&
                "Great progress! Let's add your location details."}
              {currentStep === 3 &&
                "Almost there! Tell us about your amazing skills."}
              {currentStep === 4 &&
                "Final step! Set your availability and you're done! 🎉"}
            </Typography>

            <Box sx={{ textAlign: "center", fontSize: 15 }}>
              <Typography
                component="span"
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Already have an account?{" "}
              </Typography>
              <Link to="/login" style={{ textDecoration: "none" }}>
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
                  Login
                  <ArrowRightAltIcon sx={{ fontSize: 18, ml: 0.5 }} />
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
