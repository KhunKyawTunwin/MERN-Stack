import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(createError(401, "Authorization token not found."));
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    next(createError(500, "Something went wrong."));
  }

  if (!decodedToken) {
    return next(createError(401, "Not authenticated."));
  }

  req.userId = decodedToken.userId;
  req.isSeller = decodedToken.isSeller;
  next();
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (!req.isAdmin) return next(createError(403, "You are not authorized!"));
    next();
  });
};
