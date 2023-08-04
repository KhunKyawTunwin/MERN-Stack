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
// import errorHandler from "./middleware/errorHandler.js";
// import { logEvents, logger } from "./middleware/logger.js";

// import path from "path";

// const currentFilePath = new URL(import.meta.url).pathname;
// const currentDirectory = path.dirname(currentFilePath);
// const logsDirPath = path.join(currentDirectory, "views", "404.html");

const app = express();

connectDB();

// app.use(logger);

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

// app.all("/*", (req, res) => {
//   console.log("Request data is", res);
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(logsDirPath);
//   } else if (req.accepts("json")) {
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

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
  // logEvents(
  //   `${err.no}: ${err.code}\t${err.syscall}\t${err.hotname}`,
  //   "mongoErrLog.log"
  // );
});

/* const mongodbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(`Error with ${error}`);
  }
}; */

// Server
/* app.listen(process.env.PORT, () => {
  mongodbConnect();
  console.log(`Server running on port:http://localhost:${process.env.PORT}`);
});
 */
