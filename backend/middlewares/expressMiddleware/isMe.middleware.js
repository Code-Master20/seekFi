// middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../../utils/errorHandler.util");

const isMeMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return new ErrorHandler(401, "Not authenticated").send(res);
    }

    const decoded = jwt.verify(token, process.env.JWT_LOGGED_TRACK_SECRET_KEY);

    if (!decoded) {
      return ErrorHandler(
        401,
        "your data is mailformed, please log-in again",
      ).send(res);
    }
    req.user = decoded; // payload from JWT {only email, id}
    next();
  } catch (err) {
    return new ErrorHandler(
      500,
      "Internal Server Error, Please refresh or re-login",
    ).send(res);
  }
};

module.exports = isMeMiddleware;
