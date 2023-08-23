import express from "express";
import { verifyAdmin, verifyToken } from "../middleware/is-auth.js";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
  gigUpdate,
} from "../controllers/gig.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.put("/:id", verifyAdmin, gigUpdate);
router.get("/single/:id", getGig);
router.get("/", getGigs);

export default router;
