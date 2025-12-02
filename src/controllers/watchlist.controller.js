import { ObjectId } from "mongodb";

import { Media } from "../models/media.js";
import { Watchlist } from "../models/watchlist.model.js";
import { fetchTMDBMedia } from "../utils/tmdb.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { tmdbId, type, status, progress, score } = req.body;
    const userId = req.user._id;

    // check if media already exists
    let media = await Media.findOne({ tmdbId });

    if (!media) {
      const meta = await fetchTMDBMedia(tmdbId, type);
      media = await Media.create(meta);
    }

    // check if this media is already in user's list
    let existing = await Watchlist.findOne({ userId, mediaId: media._id });
    if (existing) {
      return res.status(400).json({ message: "Already in your list." });
    }

    // Create list entry
    const entry = await Watchlist.create({
      userId,
      mediaId: media._id,
      status: status || "plan_to_watch",
      progress: progress || 0,
      score: score || null,
    });

    res.json({ message: "Added to watchlist", entry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get data for one type of watchlist like watching or on hold etc.
export const getWatchlist = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.user._id;

    const items = await Watchlist.find({ userId, status })
      .populate("mediaId")
      .sort({ createdAt: -1 });

    // formating media entry properly
    const formatted = items.map((entry) => ({
      _id: entry._id,
      status: entry.status,
      progress: entry.progress,
      score: entry.score,
      tags: entry.tags,
      notes: entry.notes,
      media: {
        tmdbId: entry.mediaId.tmdbId,
        title: entry.mediaId.title,
        posterPath: entry.mediaId.posterPath,
        type: entry.mediaId.type,
        totalEpisodes: entry.mediaId.totalEpisodes,
      },
    }));

    res.json({ items: formatted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateWatchlistEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id;

    const entry = await Watchlist.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    res.json({ message: "Updated", entry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteWatchlistEntry = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    await Watchlist.findOneAndDelete({ _id: id, userId });

    res.json({ message: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWatchlistStats = async (req, res) => {
  try {
    const userId = new ObjectId(`${req.user._id}`);

    const stats = await Watchlist.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const formatted = {};
    stats.forEach((s) => (formatted[s._id] = s.count));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEntryStatus = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const media = await Media.findOne({ tmdbId: id });

  // If media is not in DB at all
  if (!media) {
    return res.status(200).json(
      new ApiResponse(200, "Not in watchlist", {
        exists: false,
        _id: null,
        status: null,
      })
    );
  }

  const entry = await Watchlist.findOne({ userId, mediaId: media._id });

  if (!entry) {
    return res.status(200).json(
      new ApiResponse(200, "Not in watchlist", {
        exists: false,
        _id: null,
        status: null,
      })
    );
  }
  console.log(entry);

  return res.status(200).json(
    new ApiResponse(200, "Success", {
      exists: true,
      entry,
    })
  );
};
