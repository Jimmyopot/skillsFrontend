import { createSlice } from "@reduxjs/toolkit";
import { signupAction, checkUserUniqueAction } from "./SignUpActions";

const initialState = {
  signup: false,
  signupResp: null,
  availableDate: "",
  availableTime: "",
  // User uniqueness check state
  checkingUniqueness: false,
  uniquenessResult: null,
  uniquenessError: null,
  emailConflict: false,
  phoneConflict: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    // Define your synchronous reducers here if needed
    setAvailableDate: (state, action) => {
      state.availableDate = action.payload;
    },
    setAvailableTime: (state, action) => {
      state.availableTime = action.payload;
    },
    // Reset uniqueness check state
    clearUniquenessCheck: (state) => {
      state.checkingUniqueness = false;
      state.uniquenessResult = null;
      state.uniquenessError = null;
      state.emailConflict = false;
      state.phoneConflict = false;
    },
  },
  extraReducers: (builder) => {
    // Handle async actions here if needed
    builder
      // Signup action handlers
      .addCase(signupAction.pending, (state) => {
        state.signup = true;
        state.signupResp = null;
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.signup = false;
        state.signupResp = action.payload;
      })
      .addCase(signupAction.rejected, (state, action) => {
        state.signup = false;
        state.signupResp = action.payload;
      })
      // Check user uniqueness action handlers
      .addCase(checkUserUniqueAction.pending, (state) => {
        state.checkingUniqueness = true;
        state.uniquenessResult = null;
        state.uniquenessError = null;
        state.emailConflict = false;
        state.phoneConflict = false;
      })
      .addCase(checkUserUniqueAction.fulfilled, (state, action) => {
        state.checkingUniqueness = false;
        state.uniquenessResult = action.payload;
        state.uniquenessError = null;
        state.emailConflict = false;
        state.phoneConflict = false;
      })
      .addCase(checkUserUniqueAction.rejected, (state, action) => {
        state.checkingUniqueness = false;
        state.uniquenessResult = null;
        state.uniquenessError = action.payload;
        
        // Handle conflict scenarios
        if (action.payload?.status === 409 && action.payload?.errorData) {
          state.emailConflict = action.payload.errorData.emailConflict || false;
          state.phoneConflict = action.payload.errorData.phoneConflict || false;
        }
      });
  },
});

export const { setAvailableDate, setAvailableTime, clearUniquenessCheck } = signUpSlice.actions;

export default signUpSlice.reducer;
