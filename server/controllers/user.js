import User from "../models/user.js";
import { createError } from "../utils/createError.js";

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user || !id)
      throw new Error("A user with this ID could not be found.");

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
  res.status(200).json({ message: "Have been deleted!" });
};
