import cloudinary from "../config/cloudnary.js";


import { User } from "../models/userModal.js";

export const userService = async (req, res, next) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // 🔹 Single file
    if (files.length === 1) {
      const file = files[0];

      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "multer",
        },
      );

      const user = await User.create({
        name: req.body.name,
        url: {
          url: result.secure_url,
          public_id: result.public_id,
        },
        urls: null,
      });

      return res.status(200).json({
        success: true,
        result,
        message: "Single file uploaded",
      });
    }

    // 🔹 Multiple files
    const uploadedResults = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "multer",
        },
      );

      uploadedResults.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    const user = await User.create({
      name: req.body.name,
      url: null,
      urls: uploadedResults,
    });

    return res.status(200).json({
      success: true,
      result: uploadedResults,
      message: "Multiple files uploaded",
    });
  } catch (error) {
    next(error);
  }
};
