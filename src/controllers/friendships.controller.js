import { Friendship } from "../models/friendship.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const sendFriendRequest = async (req, res) => {
  const user = req.user;
  const { newFriendId } = req.body;

  if (!newFriendId) {
    throw new ApiError(400, "Second persons id not received");
  }

  const newFriend = await User.findOne({ _id: newFriendId });
  if (!newFriend) {
    throw new ApiError(400, "Recepient of this request does not exists");
  }

  const newFriendship = await Friendship.create({
    userA: user._id,
    userB: newFriendId,
    status: "accepted",
    requestedBy: user._id,
  });

  if (!newFriendship) {
    throw new ApiError(500, "Failed to completed the friendship request");
  }

  console.log("newFriendship", newFriendship);

  return res.status(201).json(new ApiResponse(201, "Friend added", newFriend));
};

export const getAllFriends = async (req, res) => {
  const user = req.user;

  const allFriends = await Friendship.find({
    status: "accepted",
    $or: [{ userA: user._id }, { userB: user._id }],
  })
    .populate("userA", "username fullname")
    .populate("userB", "username fullname");

  if (!allFriends) {
    throw new ApiError(500, "Failed to get all friends");
  }

  console.log("allFriends", allFriends);

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched all friends", allFriends));
};
