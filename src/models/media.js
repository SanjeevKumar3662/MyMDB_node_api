import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, unique: true, index: true },
    title: String,
    posterPath: String,
    backdropPath: String,
    type: { type: String, enum: ["movie", "tv"] },
    totalEpisodes: Number, // only for TV
    overview: String,
    releaseDate: String,
    updatedAt: Date,
  },
  { timestamps: true }
);

export const Media = mongoose.model("Media", mediaSchema);
