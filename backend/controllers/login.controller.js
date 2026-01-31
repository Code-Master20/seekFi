const User = require("../models/user.model");

const logIn = async (req, res, _) => {
  try {
    const { username, email, creator } = req.user;
    const userFound = await User.findOne({ email });
    const token = userFound.generateLogTrackTkn();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // or "none" if frontend is on another domain
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user: {
        id: userFound._id,
        username,
        email,
        creator,
      },
      message: "logged in successfull",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = logIn;
