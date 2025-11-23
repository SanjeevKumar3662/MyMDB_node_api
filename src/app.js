import dns from "dns";
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}
import express from "express";
import "dotenv/config";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import { connectDB } from "./db/db.js";
import mediaRouter from "./routes/media.routes.js";
import userRouter from "./routes/user.route.js";
import watchlistRotuer from "./routes/watchlist.route.js";

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      `https://sanjeevsmdb.vercel.app`,
      "https://mdb.sanjeevkumar.site",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/watchlist", watchlistRotuer);

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

try {
  await connectDB();
} catch (error) {
  console.error(error);
}

export default app;
