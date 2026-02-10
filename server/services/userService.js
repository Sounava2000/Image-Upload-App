import cloudinary from "../config/cloudnary.js";
import fs from "fs";
import { User } from "../models/userModal.js";
export const userService = async (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  if (files.length === 1) {
    const result = await cloudinary.uploader.upload(files[0].path, {
      folder: "multer",
    });
    fs.unlinkSync(files[0].path);
    const user = await User.create({
      name: req.body.name,
      url: { url: result.url, public_id: result.secure_url },
      urls: null,
    });
    return res.status(200).json({
      success: true,
      result,
      count: files.length,
      files,
      message: "  file uploaded 1 ",
    });
  }
  const uploadedResults = [];
  for (let i = 0; i < files.length; i++) {
    const result = await cloudinary.uploader.upload(files[i].path, {
      folder: "multer",
    });
    uploadedResults.push({
      url: result.secure_url,
      public_id: result.public_id,
    });

    fs.unlinkSync(files[i].path);
  }
  const user = await User.create({
    name: req.body.name,
    url: null,
    urls: uploadedResults,
  });
  return res.status(200).json({
    success: true,
    count: files.length,
    files,
    result: uploadedResults,
    message: " file uploaded all ",
  });
};
