import { postModel } from "./post.model.js";

export const findAllPostsRepo = async () => {
  return await postModel.find();
};

export const findPostByIdRepo = async (postId) => {
  return await postModel.findById({ _id: postId });
};

export const findPostsByUseridRepo = async (userId) => {
  return await postModel.find({ userId: userId });
};

export const addNewPostRepo = async (postObj) => {
  const newPost = new postModel(postObj);
  return await newPost.save();
};

export const deletPostRepo = async (postId, userId) => {
  return await postModel.findOneAndDelete({ _id: postId, userId: userId });
};

export const updatePostRepo = async (postId, userId, updatePostObj) => {
  const filter = {
    _id: postId,
    userId: userId,
  };

  return await postModel.findOneAndUpdate(filter, updatePostObj, { new: true });
};
