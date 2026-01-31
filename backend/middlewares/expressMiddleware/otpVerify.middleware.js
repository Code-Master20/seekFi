// middlewares/expressMiddleware/otpVerify.middleware.js
const bcrypt = require("bcryptjs");
const EmailOtp = require("../../models/emailOtp.model");
const TemporaryUser = require("../../models/temporaryUser.model");
const User = require("../../models/user.model");
const SuccessHandler = require("../../utils/successHandler.util");
const ErrorHandler = require("../../utils/errorHandler.util");

const otpVerify = async (req, res, next) => {
  try {
    const { email, otp, purpose } = req.body;

    if (!purpose) {
      return new ErrorHandler(400, "otp purpose is required")
        .log("otp purpose", "otp purpose is not provided")
        .send(res);
    }

    const otpRecord = await EmailOtp.findOne({ email, purpose });
    if (!otpRecord) {
      return new ErrorHandler(400, "otp is invalid or expired")
        .log("Otp disruptured", "otp is expired or invalid")
        .send(res);
    }

    const isValid = await otpRecord.compareOtp(otp);
    if (!isValid) {
      return new ErrorHandler(400, "invalid OTP")
        .log("otp vadidation", "otp is invalid")
        .send(res);
    }

    if (purpose === "signup") {
      const tempUser = await TemporaryUser.findOne({ email });
      if (!tempUser) {
        return new ErrorHandler(400, "you are signing up")
          .log("sign up pending", "no sign up is pending")
          .send(res);
      }
      req.tempUser = tempUser;
    }

    await EmailOtp.deleteMany({ email, purpose });

    if (purpose === "login") {
      const userData = await User.findOne({ email }).select("-password");
      //const userData = await User.findOne({ email }, { password: 0 });
      req.user = userData;
    }

    next();
  } catch (error) {
    return new ErrorHandler(500, "internal server error")
      .log("otp verification failed", error)
      .send(res);
  }
};

module.exports = otpVerify;
