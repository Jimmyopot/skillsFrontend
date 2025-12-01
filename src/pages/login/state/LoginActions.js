import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../../utils/config";

// export const loginAction = createAsyncThunk(
//   "account/login",
//   async ({ email, password, onSuccess, onFailure }, { rejectWithValue }) => {
//     try {
//       const requestData = {
//         email: email,
//         password: password
//       };

//       const response = await axios.post(
//         `${config.apiUrl}account/login`,
//         requestData
//       );
      
//       // Success case - login successful, token received
//       const { token } = response.data;
      
//       // Store token in localStorage for persistence
//       if (token) {
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userEmail', email);
//       }
      
//       if (onSuccess) onSuccess(response.data);
//       return response.data;
//     } catch (error) {
//       const status = error.response?.status;
//       let message = "Login failed. Please try again.";
//       let errorData = null;

//       if (status === 401) {
//         // Unauthorized - invalid credentials
//         message = "Invalid email or password. Please check your credentials.";
//       } else if (status === 400) {
//         // Bad Request - missing email or password
//         message = error.response?.data?.message || "Email and password are required.";
//       } else if (status === 500) {
//         // Server Error
//         message = "Server error. Please try again later.";
//       } else {
//         // Other errors
//         message = error.response?.data?.message || "Login failed. Please try again.";
//       }
      
//       errorData = {
//         message,
//         status,
//         originalError: error.response?.data
//       };
      
//       if (onFailure) onFailure(errorData);
//       return rejectWithValue(errorData);
//     }
//   }
// );

export const loginAction = createAsyncThunk(
  "account/login",
  async (loginData, { rejectWithValue }) => {
    try {
      // @ts-ignore
      const email = loginData?.email || '';
      // @ts-ignore
      const password = loginData?.password || '';
      
      const response = await axios.post(
        `${config.apiUrl}account/login`, {
          email,
          password
        });

      const { token, user } = response.data;

      // Store user object with token inside for authHeader compatibility
      const userWithToken = { ...user, token };
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userWithToken));

      return {
        token,
        user: userWithToken,
        email: user.email,
        isAuthenticated: true
      }
    } catch (error) {
      let message = "Login failed. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }
      return rejectWithValue(message);
    }
  }
);

// Action to check if user is already logged in (token validation)
export const checkAuthAction = createAsyncThunk(
  "account/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const userString = localStorage.getItem('user');
      const token = localStorage.getItem('authToken');
      
      if (!userString || !token) {
        throw new Error('No authentication data found');
      }
      
      const user = JSON.parse(userString);
      
      // Ensure user object has token for authHeader compatibility
      if (!user.token) {
        user.token = token;
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return {
        user,
        token: user.token,
        email: user.email,
        isAuthenticated: true
      };
    } catch (error) {
      // Clear any corrupted auth data
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      
      let message = 'Authentication check failed';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

// Action to logout user
export const logoutAction = createAsyncThunk(
  "account/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Clear both token and user data from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      
      return { message: "Logged out successfully" };
    } catch (error) {
      return rejectWithValue({ message: "Logout failed" });
    }
  }
);
