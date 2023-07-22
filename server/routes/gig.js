import express from "express";
import { verifyToken } from "../middleware/is-auth.js";
import { createGig, deleteGig } from "../controllers/gig.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
// router.get("/", verifyToken, getGigs);
// router.get("/single/:id", verifyToken, getGig);
// router.post("/", verifyToken, createGig);

export default router;
