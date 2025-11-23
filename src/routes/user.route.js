import { Router } from "express";
import {
  authMe,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { authenticateAccessToken } from "../middelwares/auth.js";

const router = Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.post("/logout", authenticateAccessToken, asyncHandler(logoutUser));
router.post("/refreshAccessToken", asyncHandler(refreshAccessToken));
router.get("/me", authenticateAccessToken, asyncHandler(authMe));

router.get("/ping", async (req, res) => {
  // was using this sample code to simulate a delay (just like render)
  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  // await delay(10000);
  return res.status(200).json({ message: "Success" });
});

export default router;
