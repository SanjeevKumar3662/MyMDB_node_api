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
