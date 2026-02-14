import { createSlice } from "@reduxjs/toolkit";
import {
  checkMe,
  signUpOtpReceived,
  otpVerifiedAndSignedUp,
} from "./authThunks";

//===============================setting constants to localstorage for values' persistent=====================
const localStorageData = JSON.parse(sessionStorage.getItem("authMode"));
console.log(localStorageData);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    isLogInTriggered: localStorageData
      ? localStorageData.isLogInTriggered
      : false,
    isSignUpTriggered: localStorageData
      ? localStorageData.isSignUpTriggered
      : false,
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
    isLogInClicked(state, action) {
      state.isLogInTriggered = action.payload;
    },
    isSignUpClicked(state, action) {
      state.isSignUpTriggered = action.payload;
    },
  },
  //========================= hitting "xyz/api/auth/me" to see if user is already logged in =======================
  extraReducers: (builder) => {
    builder
      .addCase(checkMe.pending, (state) => {
        state.loading = true;
      })

      /* 
        if isMiddleware trigger at 401 for token undefined then ,

        state.loading = false;
        state.user = null;
        state.isAuthenticated = action.payload.success; success:false
        state.successMessage = action.payload.message;  message:"Not authenticated"
      */
      /*
        if isMeMiddleware is passed and isMeController is triggered at 200 for token is valid, then,

        state.loading = false;
        state.user = action.payload.data;               data:{id, emaiil}
        state.isAuthenticated = action.payload.success; success:true
        state.successMessage = action.payload.message;  message:"Successfully Authenticated"
      */
      .addCase(checkMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.success;
        state.successMessage = action.payload.message;
      })
      /*
      if isMeMiddleware is triggered at 401 for token is expired then,
        state.loading = false;
        state.user = null;
        state.isAuthenticated = action.payload.success; success:false
        state.errorMessage = action.payload.message;    message:"your data is mailformed, please log-in again"
      */

      /*
        if isMiddleware is triggered at 500 for Internal server error during token validation, then,
        state.loading = false;
        state.user = null;
        state.isAuthenticated = action.payload.success;
        state.errorMessage = action.payload.message;    message:"Internal Server Error, Please refresh or re-login"
     */
      .addCase(checkMe.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = action.payload.success;
        state.errorMessage = action.payload.message;
      })
      // ===================== SIGN UP OTP =====================
      .addCase(signUpOtpReceived.pending, (state) => {
        state.loading = true;
        state.otp.sending = true;
      })
      .addCase(signUpOtpReceived.fulfilled, (state, action) => {
        state.loading = false;
        state.otp.sending = false;
        state.otp.sent = action.payload.success; //success = true from backend
        state.successMessage = action.payload.message; //message = "verification code sent to xyz@45gmail.com" from backend
      })
      .addCase(signUpOtpReceived.rejected, (state, action) => {
        state.loading = false;
        state.otp.sent = action.payload.success; //success = false; from backend
        state.successMessage = null;
        state.errorMessage = action.payload.success; //success = "failed to send verification code" from backend
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

export const { isLogInClicked, isSignUpClicked } = authSlice.actions;

export default authSlice.reducer;
