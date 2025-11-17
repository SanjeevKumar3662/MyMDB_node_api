import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

export const authenticateAccessToken = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    // console.log(accessToken);

    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    req.user = user;
    next();
    return;
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
