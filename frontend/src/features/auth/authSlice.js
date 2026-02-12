import { createSlice } from "@reduxjs/toolkit";
import {
  checkMe,
  signUpOtpReceived,
  otpVerifiedAndSignedUp,
} from "./authThunks";

const isLoggingTriggered = JSON.parse(
  localStorage.getItem("isLoggingTriggered"),
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isAuthenticated: false,
    isLoggingTriggered,
    loading: false,

    errorMessage: null,
    successMessage: null,

    otp: {
      sending: false,
      sent: false,
      verifying: false,
      verified: false,
    },
  },

  reducers: {
    isLoggingTask(state, action) {
      state.isLoggingTriggered = action.payload;
    },
  },
  //========================= hitting "xyz/api/auth/me" to see if user is already logged in =======================
  extraReducers: (builder) => {
    builder
      .addCase(checkMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.success;
        state.error = null;
      })
      .addCase(checkMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = action.payload.success;
      })
      // ===================== SIGN UP OTP =====================
      .addCase(signUpOtpReceived.pending, (state) => {
        state.loading = true;
        state.otp.sending = true;
      })
      .addCase(signUpOtpReceived.fulfilled, (state, action) => {
        state.loading = false;
        state.otp.sending = false;
        state.otp.sent = action.payload.success;
        state.successMessage = action.payload.message;
      })
      .addCase(signUpOtpReceived.rejected, (state, action) => {
        state.loading = false;
        state.otp.sent = action.payload.success;
        state.successMessage = null;
        state.errorMessage = action.payload.success;
      })

      // =====================VERIFY SIGN UP OTP AND AUTO SIGNED UP=====================
      .addCase(otpVerifiedAndSignedUp.pending, (state, action) => {
        state.loading = true;
        state.verifying = true;
      })
      .addCase(otpVerifiedAndSignedUp.fulfilled, (state, action) => {
        state.loading = false;
        state.otp.verifying = false;
        state.otp.verified = action.payload.success;
        state.successMessage = action.payload.message;
        state.user = action.payload.data;
      })
      .addCase(otpVerifiedAndSignedUp.rejected, (state, action) => {
        state.loading = false;
        state.otp.verifying = false;
        state.otp.verified = action.payload.success;
        state.successMessage = action.payload.success;
        state.errorMessage = action.payload.message;
      });
  },
});

export const { isLoggingTask } = authSlice.actions;

export default authSlice.reducer;
