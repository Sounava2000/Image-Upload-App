import { User } from "../models/userModal.js";
export const getPhotoService = async (req, res, next) => {
  const users = await User.find();

  const singleImages = [];
  const multipleImages = [];

  users.forEach(user => {
    if (user.url) {
      singleImages.push(user.url);
    }

    if (user.urls && user.urls.length > 0) {
      multipleImages.push(...user.urls);
    }
  });

  res.status(200).json({
    success: true,
    images: [...singleImages, ...multipleImages],
  });
};
