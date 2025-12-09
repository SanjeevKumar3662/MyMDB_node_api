import { Router } from "express";
import { authenticateAccessToken } from "../middelwares/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendFriendRequest } from "../controllers/friendships.controller.js";

const router = Router();

router.post("/", authenticateAccessToken, asyncHandler(sendFriendRequest));
// router.get("/")
export default router;
