import { createSlice } from "@reduxjs/toolkit";
import {
  checkMe,
  signUpOtpReceived,
  otpVerifiedAndSignedUp,
} from "./authThunks";

//=============================== setting constants to localstorage for values' persistent =====================
const isLogInClicked = JSON.parse(sessionStorage.getItem("isLogInClicked"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    status: null,
    user: null,
    isLogInClicked: isLogInClicked ? isLogInClicked : false,
    errorMessage: null,
    successMessage: null,
    otp: {
      sent: false, //false means otp is sending in pending situation,
      // if true means otp is sent successfully
      verifying: false,
      verified: false,
    },
  },

  reducers: {
    isLogInClickedFun(state, action) {
      state.isLogInClicked = action.payload;
    },

    // isOtpSent(state, action) {
    //   state.otp.sent = action.payload;
    // },

    // isAuthenticationChecked(state, action) {
    //   state.isAuthenticated = action.payload;
    // },
  },
  //========================= hitting "/isMe" to see if user is already logged in =======================
  extraReducers: (builder) => {
    builder
      .addCase(checkMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkMe.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.data;
        state.successMessage = action.payload.message;
      })
      .addCase(checkMe.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.isAuthenticated = action.payload.success;
        state.user = null;
        state.errorMessage = action.payload.message;
      })

      // ===================== SIGN UP OTP =====================
      .addCase(signUpOtpReceived.pending, (state) => {
        state.loading = true;
        state.otp.sent = false; //means otp is pending to be sent
      })
      .addCase(signUpOtpReceived.fulfilled, (state, action) => {
        state.loading = false;
        state.otp.sent = action.payload.success; //success = true from backend
        state.user = null;
        state.successMessage = action.payload.message; //message = "verification code sent to xyz@45gmail.com" from backend
        state.status = action.payload.status;
      })
      .addCase(signUpOtpReceived.rejected, (state, action) => {
        state.loading = false;
        state.otp.sent = action.payload.success; //success = false; from backend
        state.successMessage = null;
        state.errorMessage = action.payload.message; //message = "failed to send verification code" from backend
        state.status = action.payload.status;
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

export const {
  isLogInClickedFun,
  isOtpSent,
  isAuthenticationChecked,
  isLoading,
} = authSlice.actions;

export default authSlice.reducer;
