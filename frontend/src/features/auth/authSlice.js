import { createSlice } from "@reduxjs/toolkit";
import {
  checkMe,
  signUpOtpReceived,
  otpVerifiedAndSignedUp,
  logInOtpReceived,
  otpVerifiedAndLoggedIn,
} from "./authThunks";

//=============================== setting constants to localstorage for values' persistent =====================
const isLogInClicked = JSON.parse(localStorage.getItem("isLogInClicked"));
const otpSent = JSON.parse(localStorage.getItem("otp-sent"));
const user = JSON.parse(localStorage.getItem("user"));
const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
const purpose = JSON.parse(localStorage.getItem("purpose"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: isAuthenticated ? isAuthenticated : false,
    status: null,
    success: false,
    user: user ? user : null,
    isLogInClicked: isLogInClicked ? isLogInClicked : false,
    errorMessage: null,
    successMessage: null,
    purpose: purpose ? purpose : null,
    otp: {
      sent: otpSent ? otpSent : false, //false means otp is sending in pending situation,
      // if true means otp is sent successfully
      verifying: false,
      verified: false,
    },
  },

  reducers: {
    isLogInClickedFun(state, action) {
      state.isLogInClicked = action.payload;
    },
    isAuthenticationChecked(state, action) {
      state.isAuthenticated = action.payload;
    },
    isOtpSent(state, action) {
      state.otp.sent = action.payload;
    },
    isUserReceived(state, action) {
      state.user = action.payload;
    },
    purpose(state, action) {
      state.purpose = action.payload;
    },
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
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.user = action.payload.data;
        state.successMessage = action.payload.message; //message = "verification code sent to xyz@45gmail.com" from backend
        localStorage.setItem(
          "user",
          JSON.stringify({ email: action.payload.data.email }),
        );
        localStorage.setItem("otp-sent", JSON.stringify(true));
        localStorage.setItem("purpose", "signup");
        localStorage.removeItem("isLogInClicked");
      })
      .addCase(signUpOtpReceived.rejected, (state, action) => {
        state.loading = false;
        state.otp.sent = action.payload.success; //success = false; from backend
        state.successMessage = null;
        state.errorMessage = action.payload.message; //message = "failed to send verification code" from backend
        state.status = action.payload.status;
        state.success = action.payload.success;
      })

      // =====================VERIFY SIGN UP OTP AND AUTO SIGNED UP=====================
      .addCase(otpVerifiedAndSignedUp.pending, (state, action) => {
        state.loading = true;
        state.otp.verifying = true;
      })
      .addCase(otpVerifiedAndSignedUp.fulfilled, (state, action) => {
        state.loading = false;
        state.otp.verifying = false;
        state.otp.verified = action.payload.success; //means otp successfully verified
        state.successMessage = action.payload.message;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.success;
        localStorage.removeItem("otp-sent");
        localStorage.removeItem("user");
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      })
      .addCase(otpVerifiedAndSignedUp.rejected, (state, action) => {
        state.loading = false;
        state.otp.verifying = false;
        state.otp.verified = action.payload.success;
        state.successMessage = null;
        state.errorMessage = action.payload.message;
      })
      // ============================== LOG-IN OTP =================================
      .addCase(logInOtpReceived.pending, (state, action) => {
        state.loading = true;
        state.otp.sent = false; //means otp is pending to be sent
      })
      .addCase(logInOtpReceived.fulfilled, (state, action) => {
        state.loading = false;
        state.otp.sent = action.payload.success; //success = true from backend
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.user = action.payload.data;
        state.successMessage = action.payload.message;
        localStorage.setItem(
          "otp-sent",
          JSON.stringify(action.payload.success),
        );
        localStorage.setItem(
          "user",
          JSON.stringify({ email: action.payload.data.email }),
        );
        localStorage.setItem("purpose", JSON.stringify("login"));
      })
      .addCase(logInOtpReceived.rejected, (state, action) => {
        state.loading = false;
        state.otp.sent = action.payload.success; //success = false; from backend
        state.successMessage = null;
        state.errorMessage = action.payload.message; //message = "failed to send verification code" from backend
        state.status = action.payload.status;
        state.success = action.payload.success;
      })
      // =====================VERIFY LOG IN OTP AND AUTO LOG IN =====================
      .addCase(otpVerifiedAndLoggedIn.pending, (state, action) => {
        state.loading = true;
        state.otp.verifying = true; //means otp is verified
      })
      .addCase(otpVerifiedAndLoggedIn.fulfilled, (state, action) => {
        state.loading = false;
        state.otp.verifying = false;
        state.otp.verified = action.payload.success; //means otp is successfully verified
        state.successMessage = action.payload.message;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.success;
        localStorage.removeItem("otp-sent");
        localStorage.removeItem("purpose");
        localStorage.removeItem("user");
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(action.payload.success),
        );
      })
      .addCase(otpVerifiedAndLoggedIn.rejected, (state, action) => {
        state.loading = false;
        state.otp.verifying = false; //means otp is not verifying
        state.otp.verified = action.payload.success; //here success=false means otp cannot be verified
        state.successMessage = null;
        state.errorMessage = action.payload.message;
      });
  },
});

export const {
  isLogInClickedFun,
  isOtpSent,
  isAuthenticationChecked,
  isLoading,
  isUserReceived,
} = authSlice.actions;

export default authSlice.reducer;
