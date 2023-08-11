import express from "express";
import { verifyToken } from "../middleware/is-auth.js";
import { createGig, deleteGig, getGig, getGigs } from "../controllers/gig.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

export default router;
