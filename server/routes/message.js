import express from "express";
import { verifyToken } from "../middleware/is-auth.js";
import { createMessage, getMessages } from "../controllers/message.js";

const router = express.Router();

router.post("/", verifyToken, createMessage);
router.get("/:conversationId", verifyToken, getMessages);

export default router;
