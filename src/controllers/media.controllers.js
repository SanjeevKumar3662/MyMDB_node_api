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
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${list_type}?language=en-US&page=${page}`,
    options
  );

  if (response.success === false || !response) {
    console.log(response);
    throw new ApiError(500, "Failed to fetch media-list from data provider");
  }

  const data = await response.json();
  // console.log(data);

  return res.status(200).json(new ApiResponse(200, "Success", data));
};

export const getMediaDetails = async (req, res) => {
  const { media_type, id } = req.params;
  // media_type : movie/tv/person

  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`,
    options
  );
  if (response.success === false || !response) {
    console.log(response);
    throw new ApiError(500, "Failed to fetch media-list from data provider");
  }

  const data = await response.json();
  // console.log(data);

  return res.status(200).json(new ApiResponse(200, "Success", data));
};

export const getMediaCredits = async (req, res) => {
  const { media_type, id } = req.params;
  // media cast

  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}/credits?language=en-US`,
    options
  );

  if (!response || response.success === false) {
    console.log(response);
    throw new ApiError(500, "Failed to fetch media-list from data provider");
  }

  const data = await response.json();

  return res.status(200).json(new ApiResponse(200, "Success", data));
};

export const getSearchResults = async (req, res) => {
  const { query_type, query, page } = req.params;

  if (!(query_type && query && page)) {
    throw new ApiError(400, "All field are required");
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/${query_type}?query=${query}&page=${page}`,
    options
  );

  if (!response || response.success === false) {
    console.log(response);
    throw new ApiError(
      500,
      "Failed to fetch search results from data provider"
    );
  }

  const data = await response.json();

  return res.status(200).json(new ApiResponse(200, "Success", data));
};
