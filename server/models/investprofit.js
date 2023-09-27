import mongoose, { Schema } from "mongoose";

const InvestmentProfitSchema = new Schema({
  investorId: {
    type: Schema.Types.ObjectId,
    ref: "Gig",
  },
  investAmount: {
    type: String,
    default: 0,
  },
  yearlyEarning: {
    type: String,
    default: 0,
  },
  monthlyEarning: {
    type: String,
    default: 0,
  },
  weelyEarning: {
    type: String,
    default: 0,
  },
});

export default mongoose.model("InvestmentProfit", InvestmentProfitSchema);
