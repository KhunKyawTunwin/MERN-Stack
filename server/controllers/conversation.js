import Conversation from "../models/conversation.js";
import { createError } from "../utils/createError.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id:
      req.roles === "Seller"
        ? req.userId + req.body.to
        : req.body.to + req.userId,
    sellerId: (req.roles = "Seller" ? req.userId : req.body.to),
    buyerId: req.roles === "Seller" ? req.body.to : req.userId,
    readBySeller: req.roles === "Seller ",
    readByBuyer: !req.roles,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.roles ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};

export const getConversation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const conversation = await Conversation.findOne({ id });
    if (!conversation) return next(createError(404, "Conversation not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,

          ...(req.roles ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );
    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};
