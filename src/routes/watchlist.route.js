import { Router } from "express";
import {
  addToWatchlist,
  getWatchlist,
  updateWatchlistEntry,
  deleteWatchlistEntry,
  getWatchlistStats,
} from "../controllers/watchlist.controller.js";

import { authenticateAccessToken } from "../middelwares/auth.js";

const router = Router();

// Add new
router.post("/", authenticateAccessToken, addToWatchlist);

// List by status
router.get("/", authenticateAccessToken, getWatchlist);

// Stats for tabs
router.get("/stats", authenticateAccessToken, getWatchlistStats);

// Update row
router.patch("/:id", authenticateAccessToken, updateWatchlistEntry);

// Remove row
router.delete("/:id", authenticateAccessToken, deleteWatchlistEntry);

export default router;
