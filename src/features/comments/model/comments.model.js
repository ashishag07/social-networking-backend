import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Post id is required..."],
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required..."],
  },

  content: {
    type: String,
    required: [true, "Comment text is required..."],
  },
});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
