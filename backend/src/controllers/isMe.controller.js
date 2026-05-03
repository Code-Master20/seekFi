// controllers/me.controller.js
const SuccessHandler = require("../utils/successHandler.util");

const isMe = (req, res) => {
  return new SuccessHandler(200, "Successfully Authenticated", {
    user: req.user,
  }).send(res);
};

module.exports = isMe;
