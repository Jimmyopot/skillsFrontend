import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../utils/config";

export const signupAction = createAsyncThunk(
  "account/signup",
  async ({ formData, onSuccess, onFailure }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}account/signup`,
        formData
      );
      onSuccess(response.data);
      return response.data;
    } catch (error) {
      onFailure();
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const checkUserUniqueAction = createAsyncThunk(
  "account/checkUserUnique",
  async ({ email, phoneNumber, onSuccess, onFailure }, { rejectWithValue }) => {
    try {
      const requestData = {};
      
      // Only include fields that are provided
      if (email) requestData.email = email;
      if (phoneNumber) requestData.phoneNumber = phoneNumber;

      const response = await axios.post(
        `${config.apiUrl}account/CheckUserUnique`,
        requestData
      );
      
      // Success case - user is unique
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      let message = "Unable to check user uniqueness.";
      let errorData = null;

      if (status === 409) {
        // Conflict - user already exists
        errorData = error.response?.data;
        message = errorData?.message || "User already exists.";
      } else if (status === 400) {
        // Bad Request
        message = error.response?.data?.message || "Email or phone number is required.";
      } else {
        // Other errors
        message = "Server error. Please try again later.";
      }
      
      if (onFailure) onFailure({ message, errorData, status });
      return rejectWithValue({ message, errorData, status });
    }
  }
);
