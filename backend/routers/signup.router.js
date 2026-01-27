const express = require("express");
const router = express.Router();
const signUp = require("../controllers/signup.controller.js");

router.route("/sign-up").post(signUp);
