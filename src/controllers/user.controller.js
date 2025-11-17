import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessToken = (payload = {}) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (payload = {}) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

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

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    throw new ApiError(400, "All fields are requried");
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordRight = await bcrypt.compare(password, user.password); //this will be a bool

  if (!isPasswordRight) {
    throw new ApiError(401, "Wrong password");
  }

  const payload = { _id: user._id, username: user.username };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true, // JS can't access cookie
      secure: process.env.MODE === "PROD", // cookie only sent over HTTPS
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true, // JS can't access cookie
      secure: process.env.MODE === "PROD", // cookie only sent over HTTPS
      sameSite: "lax",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(200, "User login successful", {
        _id: user._id,
        username: user.username,
      })
    );
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new ApiError(401, "Token not received");
  }

  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  if (!payload) {
    throw new ApiError(401, "Token not valid");
  }

  const user = await User.findById(payload._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (refreshToken !== user.refreshToken) {
    throw new ApiError(401, "Expired token");
  }

  const newAccessToken = generateAccessToken({
    _id: user._id,
    username: user.username,
  });

  return res
    .status(201)
    .cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.MODE === "PROD",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    })
    .json(
      new ApiResponse(201, "accessToken refreshed", {
        _id: user._id,
        username: user.username,
      })
    );
};

export const logoutUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("accessToken", "", {
      httpOnly: true,
      secure: process.env.MODE === "PROD",
      sameSite: "lax",
      maxAge: 0,
    })
    .cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.MODE === "PROD",
      sameSite: "lax",
      maxAge: 0,
    })
    .json(new ApiResponse(200, "User logout successfull"));
};

export const authMe = async (req, res) => {
  const decoded = req.user;

  const user = await User.findById(decoded._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json({ username: user.username, _id: user._id, email: user.email });
};
