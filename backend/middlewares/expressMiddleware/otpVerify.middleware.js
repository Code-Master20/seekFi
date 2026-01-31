// middlewares/expressMiddleware/otpVerify.middleware.js
const bcrypt = require("bcryptjs");
const EmailOtp = require("../../models/emailOtp.model");
const TemporaryUser = require("../../models/temporaryUser.model");
const User = require("../../models/user.model");

const otpVerify = async (req, res, next) => {
  try {
    const { email, otp, purpose } = req.body;

    if (!purpose) {
      return res.status(400).json({ message: "OTP purpose is required" });
    }

    const otpRecord = await EmailOtp.findOne({ email, purpose });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    const isValid = await otpRecord.compareOtp(otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (purpose === "signup") {
      const tempUser = await TemporaryUser.findOne({ email });
      if (!tempUser) {
        return res.status(400).json({ message: "No pending signup found" });
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
    console.error("otpVerify error:", error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};

module.exports = otpVerify;
