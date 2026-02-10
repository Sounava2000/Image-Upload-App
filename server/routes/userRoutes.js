import express from "express";
import multer from 'multer'
import { getPhotoController, userController } from "../controllers/userController.js";
import { upload } from "../multer/singleLocal.js";
 

const router = express.Router();
 

router.post("/img-upload", upload.any(),userController)
router.get("/get-img" ,getPhotoController)

export default router;
