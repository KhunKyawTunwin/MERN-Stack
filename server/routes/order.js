import express from "express";

import { verifyToken } from "../middleware/is-auth.js";
import {
  getOrders,
  paymentAmount,
  paymentConfirm,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, paymentAmount);
router.put("/", verifyToken, paymentConfirm);

export default router;
