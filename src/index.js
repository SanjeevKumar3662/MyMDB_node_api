import express from "express";
import "dotenv/config";

import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

import mediaRouter from "./routes/media.routes.js";

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(
  cors({
    origin: ["http://localhost:5173", `https://sanjeevsmdb.vercel.app`],
    optionsSuccessStatus: 200,
  })
);

app.use("/api/v1/media", mediaRouter);

app.get("/", (req, res) => {
  const pages = [1, 2];
  const mediaTypes = ["movie", "tv"];
  const listTypes = [
    "popular",
    "top_rated",
    "upcoming",
    "now_playing",
    "airing_today",
  ];

  const searchExamples = ["batman", "superman", "friends", "breaking bad"];

  res.render("home", {
    pages,
    mediaTypes,
    listTypes,
    searchExamples,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
