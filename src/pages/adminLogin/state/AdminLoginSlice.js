import { createSlice } from "@reduxjs/toolkit";
import { adminLoginAction, adminLogoutAction, checkAdminAuthAction } from "./AdminLoginActions";

const initialState = {
  admin: null,
  token: null,
  email: null,
  isAuthenticated: false,
  loading: false,
  checkingAuth: false,
  logoutLoading: false,
  error: null,
  authError: null,
  logoutResponse: null,
};

const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    manualAdminLogout: (state) => {
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("admin");
      state.admin = null;
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
    },
    clearAdminLoginError: (state) => {
      state.error = null;
    },
    clearAdminAuthError: (state) => {
      state.authError = null;
    },
    resetAdminLoginState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Admin Login Action
      .addCase(adminLoginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.isAuthenticated = true;
      })
      .addCase(adminLoginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Admin Logout Action
      .addCase(adminLogoutAction.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(adminLogoutAction.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.logoutResponse = action.payload;

        // Clear everything
        localStorage.removeItem("adminAuthToken");
        localStorage.removeItem("admin");
        state.admin = null;
        state.token = null;
        state.email = null;
        state.isAuthenticated = false;
        state.error = null;
        state.authError = null;
      })
      .addCase(adminLogoutAction.rejected, (state, action) => {
        state.logoutLoading = false;
        state.authError = action.payload;
      })

      // 🔹 Check Admin Auth Action (restore from localStorage)
      .addCase(checkAdminAuthAction.pending, (state) => {
        state.checkingAuth = true;
        state.authError = null;
      })
      .addCase(checkAdminAuthAction.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.authError = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.admin = action.payload.admin;
      })
      .addCase(checkAdminAuthAction.rejected, (state, action) => {
        state.checkingAuth = false;
        state.authError = action.payload;

        // Clear authentication state
        state.isAuthenticated = false;
        state.token = null;
        state.email = null;
        state.admin = null;
      });
  },
});

export const {
  manualAdminLogout,
  clearAdminLoginError,
  clearAdminAuthError,
  resetAdminLoginState,
} = adminLoginSlice.actions;

export default adminLoginSlice.reducer;
