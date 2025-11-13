import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

export const getMediaList = async (req, res) => {
  const { media_type, page, list_type } = req.params;
  const respose = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${list_type}?language=en-US&page=${page}`,
    options
  );

  if (respose.success === false || !respose) {
    console.log(respose);
    throw new ApiError(500, "Failed to fetch media-list from data provider");
  }

  const data = await respose.json();
  // console.log(data);

  return res.status(200).json(new ApiResponse(200, "Success", data));
};
