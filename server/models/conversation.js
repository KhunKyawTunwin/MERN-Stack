import mongoose, { Schema } from "mongoose";

const ConversationSchem = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    sellerId: {
      type: String,
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
      required: false,
      default: "Hello, Welcome to Ethnic!",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchem);
