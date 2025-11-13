import { Router } from "express";
import { getMediaList } from "../controllers/media.controllers.js";

const router = Router();

router.get("/list/:media_type/:list_type/:page", getMediaList);

export default router;
