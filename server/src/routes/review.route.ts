import express from "express";

import reviewCtrl from "../controllers/review.controller";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";

import { CreateReviewSchema } from "../schema/review.schema";

const reviewRouter = express.Router();

reviewRouter.post(
  "/",
  verifyToken,
  validate(CreateReviewSchema),
  reviewCtrl.createReview
);
reviewRouter.get("/:gigId", reviewCtrl.getReviews);

export default reviewRouter;
