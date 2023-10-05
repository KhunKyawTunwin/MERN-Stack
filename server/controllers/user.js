import User from "../models/user.js";
import { createError } from "../utils/createError.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users.length)
      return next(createError(404, "Users could not be found."));

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user || !id)
      return next(createError(404, "A user with this ID could not be found."));

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (req.userId.id !== user._id.toString())
    return next(createError(403, "You can delete only your account!"));

  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "Account have been deleted!" });
};
