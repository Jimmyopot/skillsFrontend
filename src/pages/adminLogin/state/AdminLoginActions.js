import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../utils/config";

export const adminLoginAction = createAsyncThunk(
  "admin/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const email = loginData?.email || '';
      const password = loginData?.password || '';
      
      const response = await axios.post(
        `${config.apiUrl}admin/login`, 
        {
          email,
          password
        }
      );

      const { token, admin } = response.data;

      // Store admin object with token for auth compatibility
      const adminWithToken = { ...admin, token };
      
      localStorage.setItem('adminAuthToken', token);
      localStorage.setItem('admin', JSON.stringify(adminWithToken));

      return {
        token,
        admin: adminWithToken,
        email: admin.email,
        isAuthenticated: true
      };
    } catch (error) {
      let message = "Admin login failed. Please try again.";
      let status = null;
      
      if (error.response) {
        status = error.response.status;
        message = error.response.data?.message || message;
      } else if (error.message) {
        message = error.message;
      }
      
      return rejectWithValue({ message, status });
    }
  }
);

export const checkAdminAuthAction = createAsyncThunk(
  "admin/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const adminString = localStorage.getItem('admin');
      const token = localStorage.getItem('adminAuthToken');
      
      if (!adminString || !token) {
        throw new Error('No admin authentication data found');
      }
      
      const admin = JSON.parse(adminString);
      
      // Ensure admin object has token
      if (!admin.token) {
        admin.token = token;
        localStorage.setItem('admin', JSON.stringify(admin));
      }
      
      return {
        admin,
        token: admin.token,
        email: admin.email,
        isAuthenticated: true
      };
    } catch (error) {
      // Clear any corrupted auth data
      localStorage.removeItem('admin');
      localStorage.removeItem('adminAuthToken');
      
      let message = 'Admin authentication check failed';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const adminLogoutAction = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Clear admin auth data from localStorage
      localStorage.removeItem('admin');
      localStorage.removeItem('adminAuthToken');
      
      return { message: "Admin logged out successfully" };
    } catch {
      return rejectWithValue({ message: "Admin logout failed" });
    }
  }
);
