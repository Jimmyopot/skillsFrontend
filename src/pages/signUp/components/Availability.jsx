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
// import { setAvailableDate, setAvailableTime } from "../state/SignUpSlice";

const Availability = ({
  currentStep,
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  // const dispatch = useDispatch();
  // const { availableDate, availableTime } = useSelector(
  //   (state) => state.SignUpReducer
  // );

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
          {/* <Box>
            <Typography variant="body2" color="primary">
              Redux Date: {availableDate || "None"}
            </Typography>
            <Typography variant="body2" color="primary">
              Redux Time: {availableTime || "None"}
            </Typography>
          </Box> */}

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
