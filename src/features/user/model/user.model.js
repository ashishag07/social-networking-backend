import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required..."],
    minLength: [3, "Name should have at least 3 characters..."],
    maxLength: [30, "Name can't have more than 30 characters..."],
  },

  email: {
    type: String,
    required: [true, "Email is required..."],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required..."],
    minLength: [6, "Password should be atleast 6 characters long..."],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  const hashed = await bcrypt.hash(this.password, 12);
  this.password = hashed;
  return next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWTLoginToken = async function () {
  return jwt.sign(
    { userId: this._id, userEmail: this.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

export const userModel = mongoose.model("User", userSchema);
