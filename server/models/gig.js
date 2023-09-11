import mongoose, { Schema } from "mongoose";

const GigSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },

    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    postAccept: {
      type: Boolean,
      default: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
    endDate: {
      type: String,
      require: true,
    },
    totalInvestAmount: {
      type: String,
      default: "0",
    },
    totalInvestor: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gig", GigSchema);

// deliveryTime: {
//   type: Number,
//   required: true,
// },
