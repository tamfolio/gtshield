// loginSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isFetching: false,
  error: false,
  success: false,
};

const loginSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.success = true;
      state.error = false;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    LoginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
    LogOut: (state) => {
      state.currentUser = {};
      state.error = false;
      state.success = false;
      state.otpSuccess = false;
      state.otpError = false;
    },
  },
});

export const { loginStart, loginSuccess, LoginFailure,LogOut,resetSuccess } = loginSlice.actions;
export default loginSlice.reducer;
