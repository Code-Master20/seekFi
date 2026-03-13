// middlewares/expressMiddleware/sendingOtpToEmail.middleware.js
const TemporaryUser = require("../../models/temporaryUser.model");
const sendOtp = require("../../services/sendOtp.service");
const User = require("../../models/user.model");
const ErrorHandler = require("../../utils/errorHandler.util");
const SuccessHandler = require("../../utils/successHandler.util");
const EmailOtp = require("../../models/emailOtp.model");
const BlockedEmail = require("../../models/temBlockEmails.model");

// in-memory attempt tracker
const loginAttempts = new Map();

// ================= SIGN UP OTP =================
const sendingOtpForSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    await TemporaryUser.deleteMany({ email });

    await TemporaryUser.create({
      username,
      email,
      password,
    });

    await sendOtp({
      email,
      purpose: "signup",
    });

    return new SuccessHandler(200, `verification code sent to ${email}`, {
      email,
    }).send(res);
  } catch (error) {
    return new ErrorHandler(500, "failed to send verification code")
      .log("sending otp for sign up error", error)
      .send(res);
  }
};

// ================= LOGIN OTP =================
const sendingOtpForLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email is blocked
    const blocked = await BlockedEmail.findOne({ email });

    if (blocked) {
      const BLOCK_TIME = 5400 * 1000; // 1.5 hours

      const timePassed = Date.now() - blocked.blockedAt.getTime();
      const timeLeft = BLOCK_TIME - timePassed;

      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);

      return new ErrorHandler(
        429,
        `Too many failed attempts. Try again after ${minutes}m ${seconds}s`,
      )
        .log("login blocked", `blocked email attempted login: ${email}`)
        .send(res);
    }

    const userExisted = await User.findOne({ email });

    if (!userExisted) {
      return new ErrorHandler(404, "account not found")
        .log(
          "account error",
          "account has not been created with this email yet",
        )
        .send(res);
    }

    const isMatch = await userExisted.comparePassword(password);

    // ===== WRONG PASSWORD =====
    if (!isMatch) {
      const attempts = loginAttempts.get(email) || 0;
      const newAttempts = attempts + 1;

      loginAttempts.set(email, newAttempts);

      // block after 3 attempts
      if (newAttempts >= 3) {
        await BlockedEmail.create({ email });
        loginAttempts.delete(email);
      }

      return new ErrorHandler(401, "invalid email or password")
        .log("email or password mis-matched", "invalid email or password")
        .send(res);
    }

    // ===== PASSWORD CORRECT =====
    loginAttempts.delete(email);

    await sendOtp({
      email,
      purpose: "login",
    });

    // reset block if exists
    await BlockedEmail.deleteOne({ email });

    return new SuccessHandler(200, `verification code sent to ${email}`, {
      email,
    }).send(res);
  } catch (error) {
    return new ErrorHandler(500, "failed to send verification code")
      .log("sending otp for log-in error", error)
      .send(res);
  }
};

//===============PASSWORD RESET OTP==============
const sendingOtpForPassReset = async (req, res) => {
  try {
    const { username, email, newPassword } = req.user;
    await sendOtp({
      email,
      purpose: "reset-password",
    });

    return new SuccessHandler(
      200,
      `verification code sent to ${email} for password finalization`,
    ).send(res);
  } catch (error) {
    return new ErrorHandler(500, "Internal server error")
      .log("otp failure :", "otp sent failed")
      .send(res);
  }
};

module.exports = {
  sendingOtpForSignUp,
  sendingOtpForLogIn,
  sendingOtpForPassReset,
};
