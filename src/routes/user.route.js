import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { authenticateAccessToken } from "../middelwares/auth.js";

const router = Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));

router.get("/test", authenticateAccessToken, (req, res) => {
  // console.log(req.user);
  return res.status(200).json({ user: req.user });
});

export default router;
