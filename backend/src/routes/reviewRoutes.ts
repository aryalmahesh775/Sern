import { Router } from "express";

import {
  createReview,
  deleteReview,
  getAllReview,
  getReviewById
} from "../controller/reviewController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/",authMiddleware, createReview);
router.get("/", getAllReview);
router.get("/:id", getReviewById);
router.delete("/:id", deleteReview);

export default router;