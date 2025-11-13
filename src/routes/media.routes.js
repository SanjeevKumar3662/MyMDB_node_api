import { Router } from "express";
import {
  getMediaCredits,
  getMediaDetails,
  getMediaList,
} from "../controllers/media.controllers.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/list/:media_type/:list_type/:page", asyncHandler(getMediaList));
router.get("/details/:media_type/:id", asyncHandler(getMediaDetails));
router.get("/credits/:media_type/:id", asyncHandler(getMediaCredits));

export default router;
