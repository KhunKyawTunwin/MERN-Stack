import Gig from "../models/gig.js";
import { createError } from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller || null)
    return next(createError(403, "Only sellers can create a gig!"));
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
  const gitId = req.params.id;
  try {
    const gig = await Gig.findById(gitId);
    if (!req.isSeller || "")
      return next(createError(403, "Only sellers can create a gig!"));
    if (!gig) {
      return next(createError(404, "Gig not found."));
    }
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only at your gigs!"));

    await Gig.findByIdAndDelete(gitId);
    res.status(200).send("Gig has been deleted");
  } catch (err) {
    next(err);
  }
};
export const getGigs = async (req, res, next) => {};
export const getGig = async (req, res, next) => {};
