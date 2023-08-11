import express from "express";
import { verifyToken } from "../middleware/is-auth.js";
import {
  createReview,
  deleteReview,
  getReviews,
} from "../controllers/review.js";

const router = express.Router();

router.post("/", verifyToken, createReview);
router.delete("/:id", deleteReview);
router.get("/:gigId", getReviews);

export default router;
