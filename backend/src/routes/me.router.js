const router = require("express").Router();
const isMe = require("../controllers/isMe.controller");
const isMeMiddleware = require("../middleware/auth/isMe.middleware");

router.get("/me", isMeMiddleware, isMe);

module.exports = router;
