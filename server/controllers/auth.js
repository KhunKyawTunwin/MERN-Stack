import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  const { username, email, password, country } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json(userExists);

    const user = await User.create({
      username,
      email,
      password: hashedPw,
      country,
    });

    const newUser = await user.save();
    res.status(201).json({ message: "User created!", userId: newUser._id });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return next(
        createError(404, "A user with this email could not be found.")
      );

    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isEqual) return next(createError(400, "Password doesn't match!"));

    const token = jwt.sign(
      {
        userId: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out!");
};
