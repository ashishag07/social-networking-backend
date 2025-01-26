import { postModel } from "../../posts/model/post.model.js";
import commentModel from "./comments.model.js";

export const findAllCommentsOnPostRepo = async (postId) => {
  return await commentModel.find({ postId: postId });
};

export const findCommentByIdRepo = async (commentId) => {
  return await commentModel.findById(commentId);
};

export const addNewCommentRepo = async (newCommentObj) => {
  const newComment = new commentModel(newCommentObj);
  return await newComment.save();
};

export const deleteCommentOnPostRepo = async (commentId, userId) => {
  // 1. check if comment for that id exists
  const comment = await findCommentByIdRepo(commentId);
  if (!comment) {
    return false;
  }

  // if comment have that userId, delete the comment
  if (comment.userId == userId) {
    return await comment.deleteOne();
  }

  // 2. Retrieved the post id from comment to check wheather the comment is on the post owned by user
  const isCommentOnPostOwnByUser = await postModel.findOne({
    _id: comment.postId,
    userId: userId,
  });

  // if user own the post we can delete the comment on that post
  if (isCommentOnPostOwnByUser) {
    return await comment.deleteOne();
  }
  return false;
};

export const updateCommentRepo = async (commentId, userId, updateContent) => {
  return await commentModel.findOneAndUpdate(
    { _id: commentId, userId: userId },
    { content: updateContent },
    { new: true }
  );
};
