import express from "express";
const router = express.Router();
// import { verifyToken } from "../middleware/is-auth.js";

import { login, logout, register } from "../controllers/auth.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
