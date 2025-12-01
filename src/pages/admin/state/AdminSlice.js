import { createSlice } from "@reduxjs/toolkit";
// import { signupAction, checkUserUniqueAction } from "./SignUpActions";

const initialState = {
  
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
