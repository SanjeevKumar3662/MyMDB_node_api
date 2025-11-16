export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    if (process.env.MODE === "DEV") {
      console.error(error);
    } else {
      console.error(error.message);
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
