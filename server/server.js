import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import gigRoute from "./routes/gig.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const mongodbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(`Error with ${error}`);
  }
};

app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/conversation", conversationRoute);
// app.use("/api/message", messageRoute);
// app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong.";

  return res.status(errorStatus).send(errorMessage);
});

// Server
app.listen(process.env.PORT, () => {
  mongodbConnect();
  console.log(`Server running on port:http://localhost:${process.env.PORT}`);
});
