import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required for the post..."],
  },
  caption: {
    type: String,
    required: [true, "Caption for the post is required..."],
  },
  imageUrl: {
    type: String,
    default: "default url",
  },
});

export const postModel = mongoose.model("Post", postSchema);
