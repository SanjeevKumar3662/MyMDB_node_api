import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// using async handler
export const registerUser = async (req, res) => {
  const { username, fullname, email, password } = req.body;

  if (!(username && fullname && email && password)) {
    throw new ApiError(400, "missing fields");
  }

  const user = await User.create({ username, fullname, email, password });

  if (!user) {
    throw new ApiError(400, "this already exists");
  }

  return res.status(201).json(
    new ApiResponse(201, "User registered", {
      _id: user._id,
      username: user.username,
    })
  );
};
