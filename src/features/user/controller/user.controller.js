import {
  findUserByEmailRepo,
  createNewUserRepo,
} from "../model/user.repository.js";

import { CustomError } from "../../../utils/customError.utils.js";
import { sendToken } from "../../../utils/sendToken.utils.js";
// --------------------------------------------------------------------------------

export const userSigninController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new CustomError(400, "Please enter email/password"));
    }

    const foundUser = await findUserByEmailRepo(email, true);
    if (!foundUser) {
      return next(new CustomError(404, "User Not Found !!"));
    }

    // verify the user password
    const isVerifiedUser = await foundUser.comparePassword(password);
    if (!isVerifiedUser) {
      return next(new CustomError(401, "Invalid password !!"));
    }

    const jwtToken = await sendToken(foundUser);

    return res
      .cookie("jwtToken", jwtToken, { maxAge: 60 * 60 * 1000 })
      .status(200)
      .json({
        sucess: true,
        message: "User is loggedin successfully !!",
        user: foundUser,
      });
  } catch (error) {
    return next(new CustomError(400, error));
  }
};

//--------------------------------------------------------------------------------

export const userSignupController = async (req, res, next) => {
  try {
    const userRegister = await createNewUserRepo(req.body);
    if (!userRegister) {
      return next(
        new CustomError(400, "Something went wrong in registering the user !!")
      );
    }
    return res.status(201).json({
      sucess: true,
      message: "User is registered successfully !!",
      user: userRegister,
    });
  } catch (error) {
    next(new CustomError(400, error));
  }
};
