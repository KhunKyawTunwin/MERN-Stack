import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    next(createError(401, "Authorization token not found."));
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    next(createError(500, "Something went wrong."));
  }

  if (!decodedToken) {
    next(createError(401, "Not authenticated."));
  }

  req.userId = decodedToken.userId;
  req.isSeller = decodedToken.isSeller;
  next();
};
