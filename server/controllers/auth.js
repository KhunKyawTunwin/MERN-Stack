import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mailer from "nodemailer";

import { createError } from "../utils/createError.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
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
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);
    const certificate = jwt.sign(
      { username, email, password },
      process.env.JWT_KEY,
      {
        expiresIn: "20m",
      }
    );

    const transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.GENPASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "How about our mail.",
      html: `
        <h2>Please click on given link to activate </h2>
        <p>${process.env.CLIENT_URL}/api/auth/verify/${certificate}/${email}</p>
      `,
    };
    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) next(err);

      const newUser = new User({
        ...req.body,
        password: hashedPw,
        verified: false,
      });
      await newUser.save();
      res.status(201).json({ message: "User created!", userId: newUser._id });
    });
  } catch (err) {
    next(err);
  }
};

export const verifyGenToken = async (req, res) => {
  const { genToken, email } = req.params;
  try {
    const verifiedTokenLink = jwt.verify(genToken, process.env.JWT_KEY);
    const user = await User.findOne({ email });

    if (!user === verifiedTokenLink) {
      return res.status(404).send("User not found!");
    }

    if (user.verified) {
      return res.status(400).send("Email already verified");
    }
    user.verified = true;
    await user.save();

    res.redirect("http://localhost:5173/login");
  } catch (error) {
    console.log(error);
    res.status(400).send(`${error}`);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createError(400, `This user eamil ${email} not valid. `));
    }

    const user = await User.findOne({ email });

    if (!user.verified)
      return next(
        createError(400, "A user with this email need to verify account!")
      );

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) return next(createError(401, "Password doesn't match!"));

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
        roles: user.roles,
      },
      process.env.JWT_KEY,
      { expiresIn: "10h" }
    );

    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      img: user.img,
      roles: user.roles,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.accessToken) return res.sendStatus(204); // No content
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .json({ message: "User has been logged out!" });
};
