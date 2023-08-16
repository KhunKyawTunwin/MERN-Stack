import Gig from "../models/gig.js";
import { createError } from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  const { title, desc, cover, price } = req.body;
  try {
    if (!req.roles === "Seller")
      return next(createError(403, "You must be a seller to create a gig."));

    if (!title || !desc || !cover || !price) {
      throw new Error("Please fill in all the required fields.");
    }

    const newGig = new Gig({
      userId: req.userId,
      ...req.body,
    });

    const savedGig = await newGig.save();
    res.status(201).json({ savedGig, message: "Gig created successfully!" });
  } catch (err) {
    next(err);
  }
};

export const gigUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Gig.findById(id);
    try {
      if (!post.userId) {
        return next(createError(401, "You can update only your post!"));
      }
      const updatedPost = await Gig.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteGig = async (req, res, next) => {
  const { id } = req.params;
  try {
    const gig = await Gig.findById(id);
    if (!req.roles === "Admin")
      return next(createError(403, "Only sellers can create a gig!"));
    if (!gig) {
      return next(createError(404, "Gig not found."));
    }
    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only at your gigs!"));
    }
    await Gig.findByIdAndDelete(id);
    res.status(200).send("Gig has been deleted");
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
  // const q = req.query;
  const { userId, search, min, max, sort, cat } = req.query;

  const filters = {
    ...(userId && { userId }),
    ...(cat && { cat }),
    ...((min || max) && {
      price: {
        ...(min && { $gte: min }),
        ...(max && { $lte: max }),
      },
    }),
    ...(search && { title: { $regex: search, $options: "i" } }),
  };

  try {
    const gigs = await Gig.find(filters).sort({ [sort]: -1 });
    if (!gigs || gigs.length === 0) {
      return next(createError(404, "Gigs not found!"));
    }
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};
