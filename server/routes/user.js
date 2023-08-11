import express from "express";
import { deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken } from "../middleware/is-auth.js";

const router = express.Router();

router.get("/", verifyAdmin, getUsers);
router.get("/:id", getUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
