import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
// import { createError } from "../utils/createError";

export const createMessage = async (req, res, next) => {
  const { conversationId, desc } = req.body;
  const newMessage = new Message({
    userId: req.userId,
    conversationId,
    desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: conversationId },
      {
        $set: {
          readBySeller: req.roles === "Seller",
          readByBuyer: req.roles === "User",
          lastMessage: desc,
        },
      },
      { new: true }
    );
    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};
export const getMessages = async (req, res, next) => {
  const { conversationId } = req.params;
  try {
    const messages = await Message.find({ conversationId });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};
