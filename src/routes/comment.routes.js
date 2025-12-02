import { Router } from "express";
import { authenticateAccessToken } from "../middelwares/auth.js";
import {
  addCommentToMedia,
  deleteMediaComment,
  getMediaComments,
} from "../controllers/comment.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/", authenticateAccessToken, asyncHandler(addCommentToMedia));
router.get("/", asyncHandler(getMediaComments));
// router.patch("/", authenticateAccessToken, addCommentToMedia);
router.delete("/", authenticateAccessToken, asyncHandler(deleteMediaComment));

export default router;
