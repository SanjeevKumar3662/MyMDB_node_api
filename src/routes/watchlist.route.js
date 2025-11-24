import { Router } from "express";
import {
  addToWatchlist,
  getWatchlist,
  updateWatchlistEntry,
  deleteWatchlistEntry,
  getWatchlistStats,
  getEntryStatus,
} from "../controllers/watchlist.controller.js";

import { authenticateAccessToken } from "../middelwares/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = Router();

// Add new
router.post("/", authenticateAccessToken, addToWatchlist);

// List by status
router.get("/", authenticateAccessToken, asyncHandler(getWatchlist));
router.get(
  "/status/:id",
  authenticateAccessToken,
  asyncHandler(getEntryStatus)
);

// Stats for tabs
router.get("/stats", authenticateAccessToken, asyncHandler(getWatchlistStats));

// Update row
router.patch(
  "/:id",
  authenticateAccessToken,
  asyncHandler(updateWatchlistEntry)
);

// Remove row
router.delete(
  "/:id",
  authenticateAccessToken,
  asyncHandler(deleteWatchlistEntry)
);

export default router;
