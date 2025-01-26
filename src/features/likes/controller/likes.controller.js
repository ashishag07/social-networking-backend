import { CustomError } from "../../../utils/customError.utils.js";
import {
  findAllLikesOnPostRepo,
  toggleLikeRepo,
} from "../model/likes.repository.js";

export const getAllLikesOnPostController = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const likes = await findAllLikesOnPostRepo(postId);
    return res.status(200).json({
      success: true,
      message: "All likes on the post are retrieved successfully...",
      likes: likes,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

export const toggleLikeController = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId;
    const message = await toggleLikeRepo(postId, userId);

    return res.status(201).json({
      success: true,
      message: message,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};
