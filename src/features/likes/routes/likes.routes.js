import express from "express";
import {
  getAllLikesOnPostController,
  toggleLikeController,
} from "../controller/likes.controller.js";

const likesRouter = express.Router();

likesRouter.get("/:postId", getAllLikesOnPostController);
likesRouter.get("/toggle/:postId", toggleLikeController);

export default likesRouter;
