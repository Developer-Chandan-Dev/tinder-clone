import express from "express";

const router = express.Router();

import { signup, login, logout } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute, (req, res) => {
  res.send({
    success: true,
    user: req.user,
  });
});

// router.get("/me", protectRoute, me);
export default router;
