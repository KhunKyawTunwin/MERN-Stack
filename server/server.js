import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import gigRoute from "./routes/gig.js";
import reviewRoute from "./routes/review.js";
import orderRoute from "./routes/order.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/message.js";
import credentials from "./middleware/credentials.js";
import corsOptions from "./config/corsOptions.js";

const app = express();

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

// app.use(errorHandler);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong.";
  return res.status(errorStatus).send(errorMessage);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
