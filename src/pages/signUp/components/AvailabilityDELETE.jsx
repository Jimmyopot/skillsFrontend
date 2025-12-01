import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  Add as PlusIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setAvailableDate, setAvailableTime } from "../state/SignUpSlice";

const Availability = ({
  currentStep,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const dispatch = useDispatch();
  const { availableDate, availableTime } = useSelector(
    (state) => state.SignUpReducer
  );

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState({
    hour: "",
    minute: "",
    period: "AM",
  });
  const [availabilitySlots, setAvailabilitySlots] = useState([]);

  // Helpers
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const isDateDisabled = (date) => {
    const today = new Date();
    const selectedDateObj = new Date(currentYear, currentMonth, date);
    return selectedDateObj < today.setHours(0, 0, 0, 0);
  };

  const formatDateLabel = (date) => {
    return new Date(currentYear, currentMonth, date).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  const formatDateISO = (date) => {
    return new Date(currentYear, currentMonth, date).toISOString();
  };

  const convertTo24Hour = (hour, minute, period) => {
    let hr = parseInt(hour, 10);
    if (period === "PM" && hr < 12) hr += 12;
    if (period === "AM" && hr === 12) hr = 0;
    return `${hr.toString().padStart(2, "0")}:${minute}:00`;
  };

  // Calendar navigation
  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
    setSelectedDate(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setFormData((fd) => ({
      ...fd,
      availableDate: formatDateISO(date),
    }));
    if (errors?.availableDate) {
      setErrors((prev) => ({ ...prev, availableDate: "" }));
    }
  };

  const handleTimeAdd = () => {
    if (formData.availableDate && selectedTime.hour && selectedTime.minute) {
      const time24 = convertTo24Hour(
        selectedTime.hour,
        selectedTime.minute,
        selectedTime.period
      );

      // Build full label (date + time)
      const slotLabel = `${formatDateLabel(selectedDate)} @ ${
        selectedTime.hour
      }:${selectedTime.minute} ${selectedTime.period}`;

      // Update Redux/formData
      setFormData((fd) => ({
        ...fd,
        availableTime: time24,
      }));

      // Save in local slots list
      setAvailabilitySlots((prev) => [...prev, slotLabel]);

      if (errors?.availableTime) {
        setErrors((prev) => ({ ...prev, availableTime: "" }));
      }

      // Reset picker
      setSelectedTime({ hour: "", minute: "", period: "AM" });
    }
  };

  const removeAvailabilitySlot = (slotToRemove) => {
    setAvailabilitySlots((prev) =>
      prev.filter((slot) => slot !== slotToRemove)
    );
  };

  return (
    <Box>
      {currentStep === 4 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Info text */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="body1" sx={{ color: "grey.600" }}>
              Select specific dates and times when you're available for skill
              exchanges
            </Typography>
          </Box>

          {/* Debug Redux values */}
          <Box>
            <Typography variant="body2" color="primary">
              Redux Date: {availableDate || "None"}
            </Typography>
            <Typography variant="body2" color="primary">
              Redux Time: {availableTime || "None"}
            </Typography>
          </Box>

          {/* Calendar + Time Picker */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            {/* Calendar Section */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: "#0A6802",
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  fontSize: "0.95rem",
                }}
              >
                <CalendarIcon sx={{ mr: 1, fontSize: 18 }} /> Select Date
              </Typography>

              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 3,
                  backgroundColor: "#FCF5E6",
                  maxWidth: 320,
                }}
              >
                {/* Calendar Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <IconButton
                    onClick={() => navigateMonth("prev")}
                    size="small"
                  >
                    <ChevronLeftIcon sx={{ fontSize: 14 }} />
                  </IconButton>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "#0A6802",
                      fontSize: "0.9rem",
                    }}
                  >
                    {new Date(currentYear, currentMonth).toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" }
                    )}
                  </Typography>

                  <IconButton
                    onClick={() => navigateMonth("next")}
                    size="small"
                  >
                    <ChevronRightIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>

                {/* Weekdays */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 0.25,
                    mb: 0.5,
                  }}
                >
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <Box
                        key={day}
                        sx={{
                          textAlign: "center",
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          color: "grey.600",
                          p: 0.5,
                        }}
                      >
                        {day}
                      </Box>
                    )
                  )}
                </Box>

                {/* Calendar Days */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 0.25,
                  }}
                >
                  {Array.from({
                    length: getFirstDayOfMonth(currentMonth, currentYear),
                  }).map((_, index) => (
                    <Box key={`empty-${index}`} sx={{ p: 0.5 }}></Box>
                  ))}

                  {Array.from({
                    length: getDaysInMonth(currentMonth, currentYear),
                  }).map((_, index) => {
                    const date = index + 1;
                    const isDisabled = isDateDisabled(date);
                    const isSelected = selectedDate === date;

                    return (
                      <Button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        disabled={isDisabled}
                        sx={{
                          p: 0.5,
                          fontSize: "0.75rem",
                          borderRadius: 1,
                          aspectRatio: "1",
                          backgroundColor: isSelected
                            ? "#0A6802"
                            : "transparent",
                          color: isSelected
                            ? "white"
                            : isDisabled
                            ? "grey.400"
                            : "grey.700",
                          fontWeight: isSelected ? 600 : 400,
                          minWidth: 0,
                        }}
                      >
                        {date}
                      </Button>
                    );
                  })}
                </Box>
              </Box>
            </Box>

            {/* Time Picker Section */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ClockIcon sx={{ mr: 1, fontSize: 20 }} /> Select Time
              </Typography>

              {selectedDate ? (
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 3,
                    backgroundColor: "#E5F4E4",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    {/* Hour */}
                    <FormControl fullWidth size="small">
                      <Select
                        value={selectedTime.hour}
                        onChange={(e) =>
                          setSelectedTime({
                            ...selectedTime,
                            hour: e.target.value,
                          })
                        }
                        displayEmpty
                      >
                        <MenuItem value="">--</MenuItem>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (hour) => (
                            <MenuItem
                              key={hour}
                              value={hour.toString().padStart(2, "0")}
                            >
                              {hour.toString().padStart(2, "0")}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>

                    {/* Minute */}
                    <FormControl fullWidth size="small">
                      <Select
                        value={selectedTime.minute}
                        onChange={(e) =>
                          setSelectedTime({
                            ...selectedTime,
                            minute: e.target.value,
                          })
                        }
                        displayEmpty
                      >
                        <MenuItem value="">--</MenuItem>
                        {[
                          "00",
                          "05",
                          "10",
                          "15",
                          "20",
                          "25",
                          "30",
                          "35",
                          "40",
                          "45",
                          "50",
                          "55",
                        ].map((minute) => (
                          <MenuItem key={minute} value={minute}>
                            {minute}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* AM/PM */}
                    <FormControl fullWidth size="small">
                      <Select
                        value={selectedTime.period}
                        onChange={(e) =>
                          setSelectedTime({
                            ...selectedTime,
                            period: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleTimeAdd}
                    disabled={!selectedTime.hour || !selectedTime.minute}
                    startIcon={<PlusIcon />}
                    sx={{
                      backgroundColor: "#D79800",
                      color: "white",
                      borderRadius: 2,
                    }}
                  >
                    Add Time Slot
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 6,
                    textAlign: "center",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  <CalendarIcon
                    sx={{ fontSize: 48, color: "grey.400", mb: 2 }}
                  />
                  <Typography variant="body2" sx={{ color: "grey.500" }}>
                    Please select a date first
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Slots */}
          {availabilitySlots.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#0A6802" }}
              >
                Your Availability ({availabilitySlots.length} slots)
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {availabilitySlots.map((slot, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #ddd",
                      backgroundColor: "#FCF5E6",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {slot}
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => removeAvailabilitySlot(slot)}
                      sx={{ color: "error.main", minWidth: "auto", p: 0.5 }}
                    >
                      ×
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Availability;




// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------









import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  IconButton,
  Avatar,
  LinearProgress,
  Paper,
  Fade,
  Stack,
  Badge,
} from "@mui/material";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarToday,
  AccessTime,
  Add,
  Close as X,
  CheckCircle,
} from "@mui/icons-material";

const Availability = ({
  currentStep,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleSaveAvailability = () => {
    if (selectedSlots.length === 0) {
      setErrors({ ...errors, availability: "Please select at least one time slot" });
      return;
    }

    // Update form data with selected availability
    setFormData({
      ...formData,
      availability: selectedSlots
    });

    // Clear any previous errors
    setErrors({ ...errors, availability: "" });

    // You can add navigation logic here or show success message
    alert(`Successfully saved ${selectedSlots.length} time slot${selectedSlots.length > 1 ? 's' : ''}!`);
  };

  const handleClearAll = () => {
    setSelectedSlots([]);
    setSelectedDate(null);
    setCurrentTime(null);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  function getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }

  function handlePrevMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  }

  function handleNextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  }

  function handleDateSelect(day) {
    if (day) {
      setSelectedDate(day);
      setCurrentTime(null);
    }
  }

  const addTimeSlot = (timeToAdd) => {
    if (!selectedDate) return;
    
    const time = timeToAdd || currentTime;
    if (!time || isTimeSlotSelected(time)) return;

    const newSlot = {
      id: Date.now(),
      day: selectedDate,
      month: currentMonth.getMonth(),
      year: currentMonth.getFullYear(),
      time: time,
      monthName: monthNames[currentMonth.getMonth()]
    };

    setSelectedSlots([...selectedSlots, newSlot]);
    setCurrentTime(null);
  };

  const removeTimeSlot = (id) => {
    setSelectedSlots(selectedSlots.filter((slot) => slot.id !== id));
  };

  const isDateSelected = (day) => {
    return selectedSlots.some(slot =>
      slot.day === day &&
      slot.month === currentMonth.getMonth() &&
      slot.year === currentMonth.getFullYear()
    );
  };

  const isTimeSlotSelected = (time) => {
    if (!selectedDate) return false;
    return selectedSlots.some(slot =>
      slot.day === selectedDate &&
      slot.month === currentMonth.getMonth() &&
      slot.year === currentMonth.getFullYear() &&
      slot.time === time
    );
  };

  return (
    <Box>
      {currentStep === 4 && (
        <Box
          sx={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)",
            py: { xs: 3, md: 6 },
            px: { xs: 2, md: 3 },
          }}
        >
          <Container maxWidth="lg">
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  mx: "auto",
                  mb: 3,
                  boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
                }}
              >
                <CalendarToday sx={{ fontSize: 40, color: "white" }} />
              </Avatar>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: "#1f2937",
                  mb: 2,
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  lineHeight: 1.2,
                }}
              >
                Schedule Your Skill Exchange
              </Typography>
              <Typography
                variant="h6"
                sx={{ 
                  maxWidth: 600, 
                  mx: "auto",
                  color: "#6b7280",
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Choose all the dates and times when you're available. The more
                flexibility you offer, the easier it is to find a match!
              </Typography>
            </Box>

            {/* Progress Indicator */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 4, md: 6 } }}>
              <Stack direction="row" spacing={{ xs: 1, md: 3 }} alignItems="center">
                <Chip
                  icon={selectedDate ? <Check sx={{ fontSize: "1rem !important" }} /> : 
                    <Box sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: "50%", 
                      backgroundColor: selectedDate ? "#16a34a" : "#3b82f6", 
                      color: "white", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontSize: "0.75rem", 
                      fontWeight: "bold" 
                    }}>1</Box>
                  }
                  label="Select Date"
                  sx={{
                    backgroundColor: selectedDate ? "#dcfce7" : "#dbeafe",
                    color: selectedDate ? "#16a34a" : "#3b82f6",
                    border: `2px solid ${selectedDate ? "#16a34a" : "#3b82f6"}`,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    px: 2,
                    py: 0.5,
                    height: 40,
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
                
                <Box
                  sx={{
                    width: { xs: 40, md: 80 },
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#e5e7eb",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: selectedDate ? "100%" : "0%",
                      backgroundColor: "#3b82f6",
                      borderRadius: 3,
                      transition: "width 0.5s ease-in-out",
                    }}
                  />
                </Box>
                
                <Chip
                  icon={currentTime ? <Check sx={{ fontSize: "1rem !important" }} /> : 
                    <Box sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: "50%", 
                      backgroundColor: currentTime ? "#16a34a" : selectedDate ? "#3b82f6" : "#9ca3af", 
                      color: "white", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontSize: "0.75rem", 
                      fontWeight: "bold" 
                    }}>2</Box>
                  }
                  label="Select Time"
                  sx={{
                    backgroundColor: currentTime ? "#dcfce7" : selectedDate ? "#dbeafe" : "#f3f4f6",
                    color: currentTime ? "#16a34a" : selectedDate ? "#3b82f6" : "#9ca3af",
                    border: `2px solid ${currentTime ? "#16a34a" : selectedDate ? "#3b82f6" : "#9ca3af"}`,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    px: 2,
                    py: 0.5,
                    height: 40,
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
                
                <Box
                  sx={{
                    width: { xs: 40, md: 80 },
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#e5e7eb",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: currentTime ? "100%" : "0%",
                      backgroundColor: "#3b82f6",
                      borderRadius: 3,
                      transition: "width 0.5s ease-in-out",
                    }}
                  />
                </Box>
                
                <Chip
                  icon={selectedSlots.length > 0 ? <Check sx={{ fontSize: "1rem !important" }} /> : 
                    <Box sx={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: "50%", 
                      backgroundColor: selectedSlots.length > 0 ? "#16a34a" : "#9ca3af", 
                      color: "white", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontSize: "0.75rem", 
                      fontWeight: "bold" 
                    }}>3</Box>
                  }
                  label={`${selectedSlots.length} Added`}
                  sx={{
                    backgroundColor: selectedSlots.length > 0 ? "#dcfce7" : "#f3f4f6",
                    color: selectedSlots.length > 0 ? "#16a34a" : "#9ca3af",
                    border: `2px solid ${selectedSlots.length > 0 ? "#16a34a" : "#9ca3af"}`,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    px: 2,
                    py: 0.5,
                    height: 40,
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              </Stack>
            </Box>

            {/* Main Content */}
            <Grid container spacing={{ xs: 3, md: 6 }} sx={{ mb: 8 }}>
              {/* Calendar Section */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    p: { xs: 4, md: 4 },
                    backgroundColor: "white",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                      transform: "translateY(-2px)",
                    }
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        color: "#1f2937",
                        fontSize: { xs: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      Choose a Date
                    </Typography>
                    {selectedDate && (
                      <Chip
                        label={`${monthNames[currentMonth.getMonth()]} ${selectedDate}`}
                        sx={{
                          backgroundColor: "#dbeafe",
                          color: "#1d4ed8",
                          fontWeight: 600,
                          border: "2px solid #3b82f6",
                        }}
                        size="small"
                      />
                    )}
                  </Box>

                  {/* Month Navigation */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <IconButton
                      onClick={handlePrevMonth}
                      sx={{
                        backgroundColor: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        width: 44,
                        height: 44,
                        "&:hover": { 
                          backgroundColor: "#f3f4f6",
                          transform: "scale(1.1)",
                        }
                      }}
                    >
                      <ChevronLeft sx={{ color: "#374151" }} />
                    </IconButton>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700,
                        color: "#1f2937",
                        fontSize: { xs: "1.125rem", md: "1.25rem" },
                      }}
                    >
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </Typography>
                    <IconButton
                      onClick={handleNextMonth}
                      sx={{
                        backgroundColor: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        width: 44,
                        height: 44,
                        "&:hover": { 
                          backgroundColor: "#f3f4f6",
                          transform: "scale(1.1)",
                        }
                      }}
                    >
                      <ChevronRight sx={{ color: "#374151" }} />
                    </IconButton>
                  </Box>

                  {/* Day Headers */}
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    {dayNames.map((day) => (
                      <Grid item xs key={day}>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            textAlign: "center",
                            fontWeight: 700,
                            color: "#6b7280",
                            py: 1,
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {day}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Calendar Days */}
                  <Grid container spacing={1}>
                    {getDaysInMonth(currentMonth).map((day, index) => {
                      const hasSlot = isDateSelected(day);
                      const isCurrentlySelected = selectedDate === day;

                      return (
                        <Grid item xs key={index}>
                          <Button
                            onClick={() => handleDateSelect(day)}
                            disabled={!day}
                            sx={{
                              width: "100%",
                              height: { xs: 36, md: 40 },
                              minWidth: "unset",
                              borderRadius: 2,
                              fontSize: { xs: "0.75rem", md: "0.875rem" },
                              fontWeight: 600,
                              position: "relative",
                              visibility: !day ? "hidden" : "visible",
                              transition: "all 0.2s ease",
                              ...(isCurrentlySelected
                                ? {
                                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                                    color: "white",
                                    boxShadow: "0 8px 20px rgba(79, 70, 229, 0.4)",
                                    transform: "scale(1.1)",
                                    "&:hover": {
                                      background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                                      transform: "scale(1.1)",
                                    }
                                  }
                                : hasSlot
                                ? {
                                    backgroundColor: "#dcfce7",
                                    color: "#15803d",
                                    border: "2px solid #22c55e",
                                    fontWeight: 700,
                                    "&:hover": {
                                      backgroundColor: "#bbf7d0",
                                      transform: "scale(1.05)",
                                      boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
                                    }
                                  }
                                : {
                                    backgroundColor: "#f9fafb",
                                    color: "#374151",
                                    border: "1px solid #e5e7eb",
                                    "&:hover": {
                                      backgroundColor: "#dbeafe",
                                      color: "#1d4ed8",
                                      transform: "scale(1.05)",
                                      borderColor: "#3b82f6",
                                    }
                                  }),
                            }}
                          >
                            {day}
                            {hasSlot && !isCurrentlySelected && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 6,
                                  right: 6,
                                  width: 8,
                                  height: 8,
                                  backgroundColor: "#22c55e",
                                  borderRadius: "50%",
                                  border: "2px solid white",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                              />
                            )}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              </Grid>

              {/* Time Section */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    mt: 4,
                    borderRadius: 4,
                    p: { xs: 4, md: 4 },
                    backgroundColor: "white",
                    border: "1px solid #f3f4f6",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    opacity: !selectedDate ? 0.6 : 1,
                    transition: "all 0.3s ease",
                    height: "100%",
                    "&:hover": {
                      boxShadow: !selectedDate ? "0 10px 25px rgba(0, 0, 0, 0.1)" : "0 20px 40px rgba(0, 0, 0, 0.12)",
                      transform: !selectedDate ? "none" : "translateY(-2px)",
                    }
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        color: "#1f2937",
                        fontSize: { xs: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      Choose a Time
                    </Typography>
                    {selectedDate && (
                      <Chip
                        label={`${monthNames[currentMonth.getMonth()]} ${selectedDate}, ${currentMonth.getFullYear()}`}
                        sx={{
                          backgroundColor: "#f3e8ff",
                          color: "#7c3aed",
                          fontWeight: 600,
                          border: "2px solid #a855f7",
                        }}
                        size="small"
                      />
                    )}
                  </Box>

                  {!selectedDate ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 350,
                        textAlign: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          backgroundColor: "#f3f4f6",
                          mb: 3,
                        }}
                      >
                        <AccessTime sx={{ fontSize: 40, color: "#9ca3af" }} />
                      </Avatar>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 600, 
                          mb: 2, 
                          color: "#6b7280",
                          fontSize: { xs: "1.125rem", md: "1.25rem" },
                        }}
                      >
                        Please select a date first
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: "#9ca3af",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                        }}
                      >
                        Available time slots will appear here
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      {/* Time Slots Grid */}
                      <Grid container spacing={2} sx={{ mb: 4 }}>
                        {timeSlots.map((time) => {
                          const isAlreadySelected = isTimeSlotSelected(time);

                          return (
                            <Grid item xs={6} key={time}>
                              <Button
                                onClick={() => addTimeSlot(time)}
                                disabled={isAlreadySelected}
                                sx={{
                                  width: "100%",
                                  py: 1.5,
                                  borderRadius: 2,
                                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                                  fontWeight: 600,
                                  position: "relative",
                                  transition: "all 0.2s ease",
                                  ...(isAlreadySelected
                                    ? {
                                        backgroundColor: "#f3f4f6",
                                        color: "#9ca3af",
                                        cursor: "not-allowed",
                                        border: "2px solid #e5e7eb",
                                      }
                                    : {
                                        backgroundColor: "#f9fafb",
                                        color: "#374151",
                                        border: "2px solid #e5e7eb",
                                        "&:hover": {
                                          backgroundColor: "#dcfce7",
                                          borderColor: "#22c55e",
                                          color: "#15803d",
                                          transform: "scale(1.02)",
                                          boxShadow: "0 4px 12px rgba(34, 197, 94, 0.25)",
                                        }
                                      }),
                                }}
                              >
                                {time}
                                {isAlreadySelected && (
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      position: "absolute",
                                      bottom: 4,
                                      right: 8,
                                      fontSize: "0.625rem",
                                      color: "#9ca3af",
                                      fontWeight: 600,
                                      textTransform: "uppercase",
                                      letterSpacing: "0.05em",
                                    }}
                                  >
                                    Selected
                                  </Typography>
                                )}
                              </Button>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>

            {/* Selected Slots Summary */}
            {selectedSlots.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: { xs: 4, md: 6 },
                  backgroundColor: "white",
                  border: "1px solid #f3f4f6",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  mb: 8,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                    transform: "translateY(-2px)",
                  }
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CheckCircle sx={{ color: "#22c55e", fontSize: "2rem" }} />
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        color: "#1f2937",
                        fontSize: { xs: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      Selected Time Slots ({selectedSlots.length})
                    </Typography>
                  </Box>
                </Box>
                
                <Grid container spacing={3}>
                  {selectedSlots.map((slot) => (
                    <Grid item xs={12} md={6} lg={4} key={slot.id}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          backgroundColor: "#dcfce7",
                          border: "2px solid #22c55e",
                          borderRadius: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#bbf7d0",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(34, 197, 94, 0.25)",
                          }
                        }}
                      >
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 700,
                              color: "#15803d",
                              fontSize: { xs: "1rem", md: "1.125rem" },
                              mb: 0.5,
                            }}
                          >
                            {slot.monthName} {slot.day}, {slot.year}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: "#166534",
                              fontWeight: 600,
                              fontSize: { xs: "0.875rem", md: "1rem" },
                            }}
                          >
                            {slot.time}
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() => removeTimeSlot(slot.id)}
                          size="small"
                          sx={{
                            backgroundColor: "white",
                            border: "1px solid #f87171",
                            width: 36,
                            height: 36,
                            "&:hover": {
                              backgroundColor: "#fef2f2",
                              borderColor: "#ef4444",
                              transform: "scale(1.1)",
                            }
                          }}
                        >
                          <X sx={{ fontSize: "1.25rem", color: "#ef4444" }} />
                        </IconButton>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 6 }}>
              <Button
                onClick={handleClearAll}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 4,
                  px: { xs: 4, md: 6 },
                  py: { xs: 2, md: 2.5 },
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  border: "2px solid #e5e7eb",
                  color: "#6b7280",
                  backgroundColor: "white",
                  minWidth: { xs: 120, md: 150 },
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    borderColor: "#d1d5db",
                    color: "#374151",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                  }
                }}
              >
                Clear All
              </Button>
              <Button
                onClick={handleSaveAvailability}
                variant="contained"
                size="large"
                disabled={selectedSlots.length === 0}
                sx={{
                  borderRadius: 4,
                  px: { xs: 4, md: 6 },
                  py: { xs: 2, md: 2.5 },
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  fontWeight: 700,
                  textTransform: "none",
                  backgroundColor: "#22c55e",
                  color: "white",
                  minWidth: { xs: 120, md: 150 },
                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  border: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#16a34a",
                    background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(34, 197, 94, 0.4)",
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                  },
                  "&:disabled": {
                    backgroundColor: "#d1d5db",
                    color: "#9ca3af",
                    background: "none",
                    boxShadow: "none",
                  }
                }}
              >
                Save Availability
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Availability;

