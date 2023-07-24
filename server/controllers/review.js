import { createError } from "../utils/createError.js";
import Review from "../models/review.js";
import Gig from "../models/gig.js";

export const createReview = async (req, res, next) => {
  const { gigId, desc, star } = req.body;

  try {
    if (req.isSeller) {
      return next(createError(403, "Seller can't to create review!"));
    }
    const newReview = new Review({
      userId: req.userId,
      gigId,
      desc,
      star,
    });

    const review = await Review.findOne({
      userId: req.userId,
      gigId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this gig!")
      );

    //TODO: check if the user purchased the gig.

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.id });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
