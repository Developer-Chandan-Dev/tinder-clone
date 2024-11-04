import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  swipeRight,
  swipeLeft,
  getMatches,
  getUserProfile,
} from "../controllers/matches.controller.js";

const router = express.Router();

router.post("/swipe-right/:likedUserId", protectRoute, swipeRight);
router.post("/swipe-left/:dislikeUserId", protectRoute, swipeLeft);

router.get("/", protectRoute, getMatches);
router.get("/user-profile", protectRoute, getUserProfile);

export default router;
