import express from "express";

import cors from "cors";
const app = express();
const port = process.env.PORT;
// console.log(port);

// import getMediaDetails from "../fetchCalls/movieLists/mediaDetails.js";
// import getMediaCredits from "../fetchCalls/movieLists/mediaCredits.js";
// import getSearchResults from "../fetchCalls/search/search.js";
// import getMediaContent from "../fetchCalls/mediaContent/mediaContent.js";

import mediaRouter from "./routes/media.routes.js";

app.use(
  cors({
    origin: [
      // "http://127.0.0.1:5500",
      // "https://tmdb-project-react.vercel.app",
      "https://my-mdb-lemon.vercel.app",
      "http://localhost:5173",
      `https://sanjeevsmdb.vercel.app`,
    ],
    optionsSuccessStatus: 200,
  })
);

app.use("/api/v1/media", mediaRouter);

app.get("/", (req, res) => {
  const pages = [1, 2]; // example pages
  const mediaTypes = ["movie", "tv"];
  const listTypes = [
    "popular",
    "top_rated",
    "upcoming",
    "now_playing",
    "airing_today",
  ];

  // Generate list of links dynamically
  let linksHTML = "";
  mediaTypes.forEach((type) => {
    listTypes.forEach((list) => {
      pages.forEach((page) => {
        linksHTML += `<li><a href="/media_lists/${type}/${list}/${page}" target="_blank">${type} ${list} page ${page}</a> → <code>/media_lists/${type}/${list}/${page}</code></li>`;
      });
    });
  });

  // Example search terms
  const searchExamples = ["batman", "superman", "friends", "breaking bad"];
  let searchHTML = "";
  searchExamples.forEach((term) => {
    searchHTML += `<li><a href="/search/movie/${encodeURIComponent(
      term
    )}/1" target="_blank">Search Movie: ${term}</a> → <code>/search/movie/${encodeURIComponent(
      term
    )}/1</code></li>`;
    searchHTML += `<li><a href="/search/tv/${encodeURIComponent(
      term
    )}/1" target="_blank">Search TV: ${term}</a> → <code>/search/tv/${encodeURIComponent(
      term
    )}/1</code></li>`;
  });

  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sanjeev's MDB API</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><text y='32' font-size='32'>🎬</text></svg>">
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #f9f9f9; color: #333; }
          h1 { color: #2c3e50; }
          code { background: #eee; padding: 2px 6px; border-radius: 4px; }
          .section { margin-bottom: 30px; }
          .endpoint { margin: 6px 0; }
          a { color: #2980b9; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>🎬 Welcome to Sanjeev's Movie Database API</h1>
        <p>
          This API provides access to movie and TV data such as lists, details, credits,
          search results, and media content using TMDB.
        </p>

        <div class="section">
          <h2>📌 Available Endpoints</h2>
          <div class="endpoint"><code>/media_lists/:media_type/:list_type/:page</code></div>
          <div class="endpoint"><code>/media_details/:media_type/:id</code></div>
          <div class="endpoint"><code>/media_credits/:media_type/:id</code></div>
          <div class="endpoint"><code>/search/:query_type/:query/:page</code></div>
          <div class="endpoint"><code>/media_content/:media_type/:id/:content_type</code></div>
        </div>

        <div class="section">
          <h2>📝 Example Media Lists</h2>
          <ul>
            ${linksHTML}
          </ul>
        </div>

        <div class="section">
          <h2>🔍 Example Search</h2>
          <ul>
            ${searchHTML}
          </ul>
        </div>

        <p><strong>Note:</strong> Replace placeholders like <code>:media_type</code>, <code>:id</code>, <code>:query</code>, and <code>:page</code> with actual values.</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
