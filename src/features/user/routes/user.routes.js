import express from "express";
import {
  userSigninController,
  userSignupController,
} from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/signin", userSigninController);
userRouter.post("/signup", userSignupController);

export default userRouter;
