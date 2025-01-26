import likeModel from "./likes.model.js";

export const findAllLikesOnPostRepo = async (postId) => {
  return await likeModel.find({ postId: postId });
};

export const addNewLikeRepo = async (postId, userId) => {
  const newLike = new likeModel({ postId: postId, userId: userId });
  return await newLike.save();
};

export const toggleLikeRepo = async (postId, userId) => {
  const existingLike = await likeModel.findOne({
    postId: postId,
    userId: userId,
  });
  if (!existingLike) {
    await addNewLikeRepo(postId, userId);
    return "Like is added";
  }
  await existingLike.deleteOne();
  return "Like is deleted";
};
