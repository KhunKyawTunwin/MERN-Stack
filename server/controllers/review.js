import { createError } from "../utils/createError.js";
import Review from "../models/review.js";
import Gig from "../models/gig.js";

export const createReview = async (req, res, next) => {
  const { gigId, desc, star } = req.body;

  if (req.roles === "Seller") {
    return next(createError(403, "Seller can't create review!"));
  }

  if (!req.userId)
    return next(createError(404, "A user with this email could not be found."));

  const newReview = new Review({
    userId: req.userId,
    gigId,
    desc,
    star,
  });
  try {
    const review = await Review.findOne({
      userId: req.userId,
      gigId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this gig!")
      );

    //TODO: check if the user purchased the gig.
    // how to check if the user purchased the gig using order model?
    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(gigId, {
      $inc: { totalStars: star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  const { gigId } = req.params;
  try {
    const reviews = await Review.find({ gigId });
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
