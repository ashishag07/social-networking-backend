import { CustomError } from "../../../utils/customError.utils.js";
import {
  addNewCommentRepo,
  deleteCommentOnPostRepo,
  findAllCommentsOnPostRepo,
  updateCommentRepo,
} from "../model/comments.repository.js";

export const getAllCommentsOnPostController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const comments = await findAllCommentsOnPostRepo(postId);
    return res.status(200).json({
      success: true,
      message: "All comments on the post are retrieved successfully...",
      comments: comments,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

export const addNewCommentOnPostController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const content = req.body.content;

    const newComment = await addNewCommentRepo({ postId, userId, content });
    return res.status(201).json({
      success: true,
      message: "New comment is added to the post",
      comment: newComment,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

export const deleteCommentController = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.userId;

    const result = await deleteCommentOnPostRepo(commentId, userId);
    console.log(result);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Comment is deleted successfully...",
      });
    }
    return next(new CustomError(400, "No comment found to delete..."));
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

export const updateCommentOnPostController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const commentId = req.params.id;
    const updatedContent = req.body.content;

    const updatedComment = await updateCommentRepo(
      commentId,
      userId,
      updatedContent
    );
    if (!updatedComment) {
      return next(new CustomError(400, "No comment found to update..."));
    }
    return res.status(200).json({
      success: true,
      message: "Comment is updated successfully...",
      updatedComment: updatedComment,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

/*
export const getAllCommentsOnPost = async (req, res, next) => {
  try {
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

*/
