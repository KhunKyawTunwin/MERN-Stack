import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "Not authenticated."));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Not authenticated."));

    req.userId = payload.userId;
    req.isSeller = payload.isSeller;
    next();
  });
  // console.log(`payload.userId is ${payload.userId} `);
};
