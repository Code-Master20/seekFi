const cloudinary = require("../utils/cloudinary.utils");
const Post = require("../models/post.model");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "seekFint/images",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Cloudinary upload failed",
          });
        }

        const newPost = await Post.create({
          title: req.body.title,
          description: req.body.description || "",
          postType: "image",
          url: result.secure_url,
          cloudinaryId: result.public_id, // ✅ STORE THIS
          user: req.user.id,
          postDate: Date.now(),
        });

        return res.status(201).json({
          success: true,
          message: "Post created successfully",
          data: newPost,
        });
      },
    );

    stream.end(req.file.buffer);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = uploadImage;
