import Gig from "../models/gig.js";
import { createError } from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller || false)
    return next(createError(403, "You must be a seller to create a gig."));
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  const { id } = req.params;
  try {
    const gig = await Gig.findById(id);
    if (!req.isSeller)
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
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
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
    if (!gigs || gigs.length === 0) {
      return next(createError(404, "Gigs not found!"));
    }
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};
