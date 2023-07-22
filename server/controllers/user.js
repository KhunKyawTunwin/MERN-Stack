import User from "../models/user.js";
import { createError } from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const { Id } = req.params;
  const user = await User.findById(Id);

  if (req.userId.id !== user._id.toString())
    return next(createError(403, "You can delete only your account!"));

  await User.findByIdAndDelete(Id);
  res.status(200).json({ message: "Have been deleted!" });
};
