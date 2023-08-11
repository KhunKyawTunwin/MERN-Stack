// import { format } from "date-fns";
// import { v4 as uuid } from "uuid";
// import fs from "fs";
// import path from "path";

// const currentFilePath = new URL(import.meta.url).pathname;
// console.log(import.meta.url);
// console.log("The cure", currentFilePath);
// const currentDirectory = path.dirname(currentFilePath);
// const logsDirPath = path.join(currentDirectory, "..", "logs");

// export const logEvents = async (message, logFileName) => {
//   const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
//   const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
//   try {
//     if (!fs.existsSync(logsDirPath)) {
//       await fs.promises.mkdir(logsDirPath, { recursive: true });
//     }

//     fs.appendFileSync((logsDirPath, logFileName), logItem);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const logger = (req, res, next) => {
//   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
//   // console.log(`${req.method} ${req.path}`);
//   next();
// };
