const cloudinary = require("../utils/cloudinary.utils");
const User = require("../models/user.model");

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "seekFint/avatar",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Cloudinary upload failed",
          });
        }

        // 🔥 Delete old avatar if exists
        if (user.avatarCloudinaryId) {
          await cloudinary.uploader.destroy(user.avatarCloudinaryId);
        }

        user.avatar = result.secure_url;
        user.avatarCloudinaryId = result.public_id;

        await user.save();

        return res.json({
          success: true,
          message: "Avatar updated successfully",
          data: user,
        });
      },
    );

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "seekFint/banner",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Cloudinary upload failed",
          });
        }

        // 🔥 Delete old avatar if exists
        if (user.bannerCloudinaryId) {
          await cloudinary.uploader.destroy(user.bannerCloudinaryId);
        }

        user.banner = result.secure_url;
        user.bannerCloudinaryId = result.public_id;

        await user.save();

        return res.json({
          success: true,
          message: "Banner updated successfully",
          data: user,
        });
      },
    );

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.avatarCloudinaryId) {
      return res.status(400).json({
        success: false,
        message: "No avatar to delete",
      });
    }

    await cloudinary.uploader.destroy(user.avatarCloudinaryId);

    user.avatar = null;
    user.avatarCloudinaryId = null;

    await user.save();

    res.json({
      success: true,
      message: "Avatar deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.bannerCloudinaryId) {
      return res.status(400).json({
        success: false,
        message: "No banner to delete",
      });
    }

    await cloudinary.uploader.destroy(user.bannerCloudinaryId);

    user.banner = null;
    user.bannerCloudinaryId = null;

    await user.save();

    res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

module.exports = { uploadAvatar, uploadBanner, deleteAvatar, deleteBanner };
