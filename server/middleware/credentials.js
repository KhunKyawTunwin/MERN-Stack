import allowedOrigins from "../config/allowedOrigins.js";

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  console.log("Request header origin", origin);
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default credentials;
