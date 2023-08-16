import express from "express";
const router = express.Router();

import {
  login,
  logout,
  register,
  verifyGenToken,
} from "../controllers/auth.js";

router.post("/register", register);
router.get("/verify/:genToken/:email", verifyGenToken);
router.post("/login", login);
router.post("/logout", logout);

export default router;
