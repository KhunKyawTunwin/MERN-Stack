import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      trim: true,
      match: [
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9]+(?<![_.])$/,
        "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
      ],
    },
    email: {
      type: String,
      unique: [true, "Email already exits!"],
      required: [true, "Email is required!"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    desc: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: String,
      default: "User",
      enum: ["User", "Seller", "Admin"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
