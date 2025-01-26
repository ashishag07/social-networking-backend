import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
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
});

const likeModel = mongoose.model("Like", likeSchema);
export default likeModel;
