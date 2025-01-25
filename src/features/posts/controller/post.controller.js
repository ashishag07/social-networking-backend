import { CustomError } from "../../../utils/customError.utils.js";
import {
  findAllPostsRepo,
  findPostByIdRepo,
  findPostsByUseridRepo,
  addNewPostRepo,
  deletPostRepo,
  updatePostRepo,
} from "../model/post.repository.js";

// 1. -----------------------------------------------------------
export const getAllPostsController = async (req, res, next) => {
  try {
    console.log("Testing to get authorized details: ", req);
    const allPosts = await findAllPostsRepo();
    return res.status(200).json({
      success: true,
      message: "All posts are retrieved successfully...",
      posts: allPosts,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

// 2. ------------------------------------------------------------------
export const getPostByIdController = async (req, res, next) => {
  try {
    const post = await findPostByIdRepo(req.params.id);
    if (!post) {
      return next(new CustomError(400, "Post not found..."));
    }
    return res.status(200).json({
      success: true,
      message: "Post by id is retrieved successfully...",
      post: post,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

// 3. ------------------------------------------------------------
export const getUserPostsController = async (req, res, next) => {
  try {
    const posts = await findPostsByUseridRepo(req.userId);
    return res.status(200).json({
      success: true,
      message: "User's all posts are retrieved successfully...",
      post: posts,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

// 4. --------------------------------------------------------------
export const addNewPostController = async (req, res, next) => {
  try {
    const caption = req.body.caption;
    const imageUrl = req.file.filename || "default url";
    const postObj = {
      userId: req.userId,
      caption,
      imageUrl,
    };
    const post = await addNewPostRepo(postObj);

    return res.status(201).json({
      success: true,
      message: "Post is added successfully...",
      post: post,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

// 5. -------------------------------------------------------------
export const deletePostController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const result = await deletPostRepo(postId, userId);
    if (!result) {
      return next(
        new CustomError(
          404,
          "Post is not found / You can delete only your post"
        )
      );
    }
    return res.status(200).send("Post is deleted successfully...");
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

// 6. ---------------------------------------------------------------
export const updatePostController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const result = await updatePostRepo(postId, userId, req.body);
    if (!result) {
      return next(new CustomError(400, "You can update only your post !!"));
    }
    return res.status(200).json({
      success: true,
      message: "User is updated successfully...",
      updatedUser: result,
    });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};
