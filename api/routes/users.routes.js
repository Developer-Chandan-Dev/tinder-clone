import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { updateProfile } from "../controllers/user.controller.js";
import upload from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

router.put('/update', protectRoute, upload.single("image"), updateProfile);

export default router;
