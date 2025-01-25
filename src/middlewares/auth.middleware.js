import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError.utils.js";

export const auth = async (req, res, next) => {
  // get the token
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return next(new CustomError(403, "User is not authorized"));
    }
    req.userId = payload.userId;
    req.userEmail = payload.userEmail;
    next();
  });
};
