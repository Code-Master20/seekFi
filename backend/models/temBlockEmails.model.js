const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  blockedAt: {
    type: Date,
    default: Date.now,
    index: { expires: 5400 }, // 1.5 hours
  },
});

const BlockedEmail = mongoose.model("BlockedEmail", blockSchema);
module.exports = BlockedEmail;
