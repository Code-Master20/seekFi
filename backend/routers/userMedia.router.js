const router = require("express").Router();
const upload = require("../middlewares/expressMiddleware/multer.middleware");
const isMeMiddleware = require("../middlewares/expressMiddleware/isMe.middleware");
const {
  uploadAvatar,
  uploadBanner,
  deleteAvatar,
  deleteBanner,
} = require("../controllers/userMedia.controller");

router.post(
  "/upload-avatar",
  isMeMiddleware,
  upload.single("file"),
  uploadAvatar,
);

router.post(
  "/upload-banner",
  isMeMiddleware,
  upload.single("file"),
  uploadBanner,
);
router.delete("/delete-avatar", isMeMiddleware, deleteAvatar);
router.delete("/delete-banner", isMeMiddleware, deleteBanner);

module.exports = router;
