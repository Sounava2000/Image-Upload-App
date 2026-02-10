import { catchAsync } from "../middlewares/catchAsync.js";
import { getPhotoService } from "../services/getPhoto.js";
import { userService } from "../services/userService.js";

export const userController = catchAsync(async (req, res, next) => {
  await userService(req, res, next);
});
 
export const getPhotoController = catchAsync(async (req, res, next) => {
  await getPhotoService(req, res, next);
});