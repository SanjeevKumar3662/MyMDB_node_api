import { Comment } from "../models/comment.model.js";
import { Media } from "../models/media.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

import { fetchTMDBMedia } from "../utils/tmdb.js";

export const addCommentToMedia = async (req, res) => {
  const userId = req.user._id;
  const { tmdbId, parentId = null, comment, type } = req.body;

  if (!(tmdbId && comment && type)) {
    throw ApiError(
      400,
      "All query params including tmdbId, type and comment are required"
    );
  }

  const isParentIdValid = Comment.findById(parentId);
  // console.log("isParentIdValid", isParentIdValid);
  if (!isParentIdValid) {
    throw ApiError(400, "Invalid parentId provided");
  }

  // check if media already exists
  let media = await Media.findOne({ tmdbId });

  if (!media) {
    const meta = await fetchTMDBMedia(tmdbId, type);
    media = await Media.create(meta);
  }
  console.log("media", media);

  const userComment = await Comment.create({
    userId,
    mediaId: media._id,
    parentId,
    comment,
  });
  console.log("new comment ", userComment);

  if (!userComment) {
    throw ApiError(500, "Could not create a comment / Try again");
  }

  // don't send the whole userComment
  return res
    .status(200)
    .json(new ApiResponse(201, "Comment created", userComment));
};
