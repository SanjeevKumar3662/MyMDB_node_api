import { Router } from "express";
import {
  getMediaContent,
  getMediaCredits,
  getMediaDetails,
  getMediaList,
  getSearchResults,
} from "../controllers/media.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/list/:media_type/:list_type/:page", asyncHandler(getMediaList));
router.get("/details/:media_type/:id", asyncHandler(getMediaDetails));
router.get("/credits/:media_type/:id", asyncHandler(getMediaCredits));
router.get("/search/:query_type/:query/:page", asyncHandler(getSearchResults));
router.get(
  "/content/:media_type/:id/:content_type",
  asyncHandler(getMediaContent)
);

export default router;
