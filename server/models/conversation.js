import mongoose, { Schema } from "mongoose";

const ConversationSchem = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    sellerId: {
      type: Number,
      required: true,
    },
    buyerId: {
      type: String,
      required: false,
    },
    readBySeller: {
      type: Boolean,
      default: false,
    },
    readByBuyer: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchem);
