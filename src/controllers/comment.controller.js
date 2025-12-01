import { Comment } from "../models/comment.model.js";
import { Media } from "../models/media.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

import { fetchTMDBMedia } from "../utils/tmdb.js";

export const addCommentToMedia = async (req, res) => {
  const userId = req.user._id;
  const { tmdbId, parentId = null, comment, type } = req.body;

  if (!(tmdbId && comment && type)) {
    throw new ApiError(
      400,
      "All query params including tmdbId, type and comment are required"
    );
  }

  const isParentIdValid = Comment.findById(parentId);
  // console.log("isParentIdValid", isParentIdValid);
  if (!isParentIdValid) {
    throw new ApiError(400, "Invalid parentId provided");
  }

  // check if media already exists
  let media = await Media.findOne({ tmdbId });

  if (!media) {
    const meta = await fetchTMDBMedia(tmdbId, type);
    media = await Media.create(meta);
  }
  // console.log("media", media);

  const userComment = await Comment.create({
    userId,
    mediaId: media._id,
    parentId,
    comment,
  }).populate("userId", "username");

  if (!userComment) {
    throw new ApiError(500, "Could not create a comment / Try again");
  }
  // console.log("new comment ", userComment);

  // don't send the whole userComment
  return res
    .status(200)
    .json(new ApiResponse(201, "Comment created", userComment));
};

export const getMediaComments = async (req, res) => {
  const { tmdbId, type } = req.query;
  // console.log(tmdbId, type);

  if (!(tmdbId && type)) {
    throw new ApiError(400, "Both tmdbId and type are required");
  }

  let media = await Media.findOne({ tmdbId });

  if (!media) {
    const meta = await fetchTMDBMedia(tmdbId, type);
    media = await Media.create(meta);
  }

  const comments = await Comment.find({ mediaId: media._id }).populate(
    "userId",
    "username"
  );
  // console.log("comments", comments);

  if (!comments) {
    throw new ApiError(500, "Faild to get comments / try again later");
  }

  // don't send the whole comments object in response
  return res.status(200).json(new ApiResponse(200, "success", comments));
};

// export const deleteMediaComment = async(req,res) =>{
//   const user = req.user;
//   const {commentId} = req.body;
// }
