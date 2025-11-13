import { Router } from "express";
import {
  getMediaDetails,
  getMediaList,
} from "../controllers/media.controllers.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/list/:media_type/:list_type/:page", asyncHandler(getMediaList));
router.get("/details/:media_type/:id", asyncHandler(getMediaDetails));

export default router;
