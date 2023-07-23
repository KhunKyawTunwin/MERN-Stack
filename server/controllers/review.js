// import Gig from "../models/gig.js";
// import Review from "../models/review.js";
// import { createError } from "../utils/createError.js";

// export const createReview = async (req, res, next) => {
//   const { userId, desc, star, gigId } = req.body;
//   if (!req.userId) throw new Error("Your are not authenticated!");

//   if (req.isSeller) throw new Error("Seller can't create a review!");

//   const newReview = new Review({
//     userId: req.userId,
//     gigId,
//     desc,
//     star,
//   });

//   try {
//     const review = await Review.findOne({
//       gigId,
//       userId,
//     });

//     if (review)
//       return next(
//         createError(403, "You have already created a review for this gig!")
//       );

//     const savedReive = await newReview.save();

//     await Gig.findByIdAndUpdate(gigId, {
//       $inc: {
//         totalStars: star,
//         starNumber: 1,
//       },
//     });
//     res.status(201).send(savedReive);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getReview = async (req, res, next) => {
//   const { gigId } = req.body;
//   try {
//     const reviews = await Review.find({ gigId });
//     res.status(201).send(reviews);
//   } catch (err) {}
// };

// export const deleteReview = async (req, res) => {};

import { createError } from "../utils/createError.js";
import Review from "../models/review.js";
import Gig from "../models/gig.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller || false) {
    return next(createError(403, "Seller can't to create review!"));
  }
  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
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
    const reviews = await Review.find({ gigId: req.params.gigId });
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
