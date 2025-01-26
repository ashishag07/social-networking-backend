import express from "express";
import {
  getAllCommentsOnPostController,
  addNewCommentOnPostController,
  deleteCommentController,
  updateCommentOnPostController,
} from "../controller/comments.controller.js";

const commentsRouter = express.Router();

commentsRouter.get("/:id", getAllCommentsOnPostController);
commentsRouter.post("/:id", addNewCommentOnPostController);
commentsRouter.delete("/:id", deleteCommentController);
commentsRouter.put("/:id", updateCommentOnPostController);

export default commentsRouter;
