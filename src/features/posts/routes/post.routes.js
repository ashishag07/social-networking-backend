import express from "express";

import {
  getAllPostsController,
  getPostByIdController,
  getUserPostsController,
  addNewPostController,
  deletePostController,
  updatePostController,
} from "../controller/post.controller.js";
import { postImageUpload } from "../../../middlewares/postImageUpload.js";

const postRouter = express.Router();

postRouter.get("/all", getAllPostsController);
postRouter.get("/:id", getPostByIdController);
postRouter.get("/", getUserPostsController);
postRouter.post("/", postImageUpload.single("imageUrl"), addNewPostController);
postRouter.delete("/:id", deletePostController);
postRouter.put("/:id", updatePostController);

export default postRouter;
