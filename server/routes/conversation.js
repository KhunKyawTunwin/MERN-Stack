import express from "express";
import Conversation from "../models/conversation.js";
import { verifyToken } from "../middleware/is-auth.js";
import {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
} from "../controllers/conversation.js";

const router = express.Router();

router.post("/", verifyToken, createConversation);
router.get("/", verifyToken, getConversations);
router.get("/single/:id", verifyToken, getConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
