import Gig from "../models/gig.js";
import { createError } from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  const { title, desc, cover, priceGoal } = req.body;
  try {
    if (req.roles !== "Seller")
      return next(createError(403, "You can not create a gig."));

    if (!title || !desc || !cover || !priceGoal) {
      throw new Error("Please fill in all the required fields.");
    }
    const postAccept = req.roles === "Admin";

    const newGig = new Gig({
      userId: req.userId,
      postAccept,
      ...req.body,
    });

    if (postAccept) {
      newGig.postAccept = true;
    }

    const savedGig = await newGig.save();

    res.status(201).json({ savedGig, message: "Gig created successfully!" });
  } catch (err) {
    next(err);
  }
};

export const gigUpdate = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Gig.findById(id);
    if (!post.userId) {
      return next(createError(401, "You can update only your post!"));
    }
    const updatedPost = await Gig.findByIdAndUpdate(
      id,
      { ...req.body, $set: { postAccept: true } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  const { id } = req.params;
  try {
    const gig = await Gig.findById(id);
    if (!gig) {
      return next(createError(404, "Gig not found."));
    }

    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only at your gigs!"));
    }
    if (req.roles === "Admin" || req.roles === req.userId) {
      await Gig.findByIdAndDelete(id);
      res.status(200).send("Gig has been deleted");
    }
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  const { id } = req.params;
  try {
    const gig = await Gig.findById(id);
    if (!gig || !id)
      return next(createError(404, "Gig not found related with this ID!"));
    return res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;

  const filters = {
    ...(q.userId && { userId: q.userId }),

    ...(q.searchGigs && { cat: q.searchGigs }),

    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),

    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
