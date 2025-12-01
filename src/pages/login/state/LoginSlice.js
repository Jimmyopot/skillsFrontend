import { createSlice } from "@reduxjs/toolkit";
import { loginAction, logoutAction, checkAuthAction } from "./LoginActions";

const initialState = {
  user: null,
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

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    manualLogout: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
    },
    clearLoginError: (state) => {
      state.error = null;
    },
    clearAuthError: (state) => {
      state.authError = null;
    },
    resetLoginState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login Action
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.isAuthenticated = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Logout Action
      .addCase(logoutAction.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.logoutResponse = action.payload;

        // Clear everything
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        state.user = null;
        state.token = null;
        state.email = null;
        state.isAuthenticated = false;
        state.error = null;
        state.authError = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.logoutLoading = false;
        state.authError = action.payload;
      })

      // 🔹 Check Auth Action (restore from localStorage)
      .addCase(checkAuthAction.pending, (state) => {
        state.checkingAuth = true;
        state.authError = null;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.authError = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.user = action.payload.user;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.checkingAuth = false;
        state.authError = action.payload;

        // Clear authentication state
        state.isAuthenticated = false;
        state.token = null;
        state.email = null;
        state.user = null;
      });
  },
});

export const {
  manualLogout,
  clearLoginError,
  clearAuthError,
  resetLoginState,
} = loginSlice.actions;

export default loginSlice.reducer;
