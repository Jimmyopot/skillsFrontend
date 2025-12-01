// @ts-nocheck
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountiesAction } from "../../../common/state/CommonActions";

const Location = ({ currentStep, formData, setFormData, errors, setErrors }) => {
  const dispatch = useDispatch();

  const { getAllCounties, getAllCountiesResp } = useSelector(
    (state) => state.CommonReducer
  );

  const countries = [
    "Kenya",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Nigeria",
    "Ghana",
    "South Africa",
    "Other",
  ];

  const isKenyaSelected = formData?.country === "Kenya";

  // Fetch counties on mount
  useEffect(() => {
    dispatch(getAllCountiesAction());
  }, [dispatch]);

  return (
    <Box>
      {currentStep === 2 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* COUNTRY DROPDOWN */}
          <Autocomplete
            value={formData?.country || null}
            onChange={(event, newValue) => {
              const selectedCountry = newValue || "";

              setFormData({
                ...formData,
                country: selectedCountry,
                cityOrTown: "", // reset when switching countries
                localityOrArea: "",
              });

              if (errors.country && selectedCountry) {
                setErrors({ ...errors, country: "" });
              }
            }}
            options={countries}
            getOptionLabel={(option) => option}
            filterOptions={(options, { inputValue }) => {
              if (!inputValue) return options;

              const searchTerm = inputValue.toLowerCase();
              return options.filter((option) =>
                option.toLowerCase().includes(searchTerm)
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select your country"
                placeholder="Search country... (e.g., Kenya)"
                error={!!errors.country}
                helperText={errors.country}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#E5F4E4",
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            noOptionsText="No countries found"
            isOptionEqualToValue={(option, value) => option === value}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#E5F4E4",
                borderRadius: 2,
              },
            }}
          />

          {/* COUNTY DROPDOWN - SHOW ONLY IF KENYA */}
          {isKenyaSelected && (
            <FormControl
              fullWidth
              sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
              error={!!errors.cityOrTown}
            >
              <Autocomplete
                value={formData?.cityOrTown || null}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, cityOrTown: newValue || "" });
                  if (errors.cityOrTown && newValue) {
                    setErrors({ ...errors, cityOrTown: "" });
                  }
                }}
                options={getAllCountiesResp?.map((county) => county.name) || []}
                getOptionLabel={(option) => option}
                filterOptions={(options, { inputValue }) => {
                  if (!inputValue) return options;

                  const searchTerm = inputValue.toLowerCase();
                  return options.filter((option) =>
                    option.toLowerCase().includes(searchTerm)
                  );
                }}
                disabled={getAllCounties}
                loading={getAllCounties}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select your county"
                    placeholder="Search county... (e.g., Nakuru)"
                    error={!!errors.cityOrTown}
                    helperText={errors.cityOrTown}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {getAllCounties ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#E5F4E4",
                      },
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                noOptionsText="No counties found"
                isOptionEqualToValue={(option, value) => option === value}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#E5F4E4",
                    borderRadius: 2,
                  },
                }}
              />
            </FormControl>
          )}

          {/* TOWN/CITY OUTSIDE KENYA - SHOW ONLY IF NOT KENYA */}
          {!isKenyaSelected && formData?.country && (
            <TextField
              fullWidth
              label="Type your Town/City"
              placeholder="e.g, Kigali, Dodoma, Kampala"
              value={formData?.localityOrArea}
              onChange={(e) => {
                setFormData({ ...formData, localityOrArea: e.target.value });
                if (errors.localityOrArea && e.target.value.trim()) {
                  setErrors({ ...errors, localityOrArea: "" });
                }
              }}
              error={!!errors.localityOrArea}
              helperText={errors.localityOrArea}
              sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Location;
