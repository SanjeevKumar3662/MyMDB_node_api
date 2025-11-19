import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    status: {
      type: String,
      enum: ["watching", "completed", "on_hold", "dropped", "plan_to_watch"],
      default: "plan_to_watch",
    },
    score: { type: Number, min: 0, max: 10, default: null },
    progress: { type: Number, default: null },

    tags: [String],
    notes: String,

    startedAt: Date,
    finishedAt: Date,

    customOrder: Number,
  },

  { timestamps: true }
);

export const Watchlist = mongoose.model("Watchlist", watchlistSchema);
