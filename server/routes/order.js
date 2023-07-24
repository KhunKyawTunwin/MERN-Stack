import express from "express";

import { verifyToken } from "../middleware/is-auth.js";
import { createError } from "../utils/createError.js";
import { createOrder, getOrders } from "../controllers/order.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

export default router;
