const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.methods.generateLogTrackTkn = async function () {
  try {
    return jwt.sign(
      {
        username: this.username,
      },
      process.env.JWT_LOGGED_TRACK_SECRET_KEY,
      {
        expiresIn: process.env.JWT_LOGGED_TRACK_TKN_EXPIRY,
      },
    );
  } catch (error) {
    console.error("Error occurred generating logged in tracker token");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
