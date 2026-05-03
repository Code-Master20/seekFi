const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./src/config/database.util");
const cookieParser = require("cookie-parser");
const signUpRoute = require("./src/routes/signup.router");
const logInRoute = require("./src/routes/login.router");
const logOutRoute = require("./src/routes/logout.router");
const passResetRoute = require("./src/routes/resetPass.router");
const userMediaRoute = require("./src/routes/userMedia.router");
const meRoute = require("./src/routes/me.router");
const cors = require("cors");
const app = express();
const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: isProd ? process.env.FRONTEND_URI : process.env.FRONTEND_URI_LOCAL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

//all middleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//all routes
app.use("/api/auth", signUpRoute);
app.use("/api/auth", logInRoute);
app.use("/api/auth", passResetRoute);
app.use("/api/auth", logOutRoute);
app.use("/api/auth", meRoute);
// app.use("/api/media", uploadRoute);
// app.use("/api/post", postRoute);
app.use("/api/user", userMediaRoute);
app.get("/", (req, res, next) => {
  res.send("hello from server");
});

connectDB().then(() => {
  console.log("Server is starting...");
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
});
