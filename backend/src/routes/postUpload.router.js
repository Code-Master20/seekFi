const router = require("express").Router();
const upload = require("../middleware/uploads/multer.banner.avatar.middleware");
const uploadImage = require("../controllers/uploadImage.controller");
const isMeMiddleware = require("../middleware/auth/isMe.middleware");

router.post(
  "/upload-image",
  isMeMiddleware,
  upload.single("file"),
  uploadImage,
);

module.exports = router;
