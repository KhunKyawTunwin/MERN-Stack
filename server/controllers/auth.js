import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  const { username, email, password, country } = req.body;
  const saltRounds = 10;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    if ((!username || !email, !password)) {
      return res.status(400).json({ message: error.message });
    }

    if (!/^[a-zA-Z ]*$/.test(username)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Invalid name entered",
      });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Invalid email entered",
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        status: "FAILED",
        message: "Password is too short!",
      });
    }

    const hashedPw = await bcrypt.hash(password, saltRounds);

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
