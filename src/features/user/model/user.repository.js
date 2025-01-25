import { userModel } from "./user.model.js";

export const findUserByEmailRepo = async (email, withPassword = false) => {
  if (withPassword) {
    return await userModel.findOne({ email: email }).select("+password");
  } else {
    return await userModel.findOne({ email: email });
  }
};

export const createNewUserRepo = async (user) => {
  const newUser = new userModel(user);
  return await newUser.save();
};
