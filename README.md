# Sanjeev's Movie Database API

A RESTful API built with **Node.js** and **Express.js** that provides access to movie and TV data using **The Movie Database (TMDB)**. This API allows fetching media lists, details, credits, search results, and media content like videos.

## Features

- Fetch **movie & TV lists** (popular, top-rated, upcoming, now playing, airing today)
- Get **media details** and **credits**
- Search for movies or TV shows
- Retrieve **media content** like trailers and videos
- CORS-enabled backend for secure frontend access
- All endpoints return JSON

## Live Example

Visit the API intro page in your browser:  
[Live Link: Here](https://first-backend-eight.vercel.app/)  
It provides clickable examples for testing all endpoints.

## API Endpoints & Examples

**1. Media Lists**  
Get lists of movies or TV shows:

```
/media_lists/:media_type/:list_type/:page
```

Examples:

```
/media_lists/movie/popular/1
/media_lists/movie/top_rated/1
/media_lists/tv/popular/1
/media_lists/tv/airing_today/1
```

**2. Media Details**  
Get detailed info for a movie or TV show:

```
/media_details/:media_type/:id
```

Examples:

```
/media_details/movie/550
/media_details/tv/1399
```

**3. Media Credits**  
Get cast & crew info:

```
/media_credits/:media_type/:id
```

Examples:

```
/media_credits/movie/550
/media_credits/tv/1399
```

**4. Search**  
Search for movies, TV shows, or multi:

```
/search/:query_type/:query/:page
```

Examples:

```
/search/movie/batman/1
/search/tv/friends/1
/search/multi/breaking%20bad/1
```

**5. Media Content**  
Get videos or trailers for a movie or TV show:

```
/media_content/:media_type/:id/:content_type
```

Examples:

```
/media_content/movie/550/videos
/media_content/tv/1399/videos
```

> Replace placeholders like `:media_type`, `:id`, `:query`, and `:page` with actual values.

## Tech Stack

- Node.js
- Express.js
- TMDB API
- CORS

## Notes

- CORS is enabled for selected origins; update as needed for your frontend.
- Errors from TMDB API are propagated with meaningful messages.
- All endpoints return JSON.

## License

MIT License © Sanjeev Kumar

Made by Sanjeev Kumar
