import { NextFunction, Request, Response } from "express";

import { Gig } from "../models/gig.model";
import { Review } from "../models/review.model";

import { CreateReviewInput } from "../schema/review.schema";

import createError from "../utils/createError";

const createReview = async (
  req: Request<{}, {}, CreateReviewInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.isSeller)
    return next(createError(403, 3, "Sellers can't create a review!"));

  const newReview = new Review({
    user: res.locals.userId,
    gig: req.body.gig,
    description: req.body.description,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gig: req.body.gig,
      user: res.locals.userId,
    });

    if (review)
      return next(
        createError(403, 3, "You have already created a review for this gig!")
      );

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gig, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).json(savedReview);
  } catch (err) {
    next(err);
  }
};

const getReviews = async (
  req: Request<{ gigId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await Review.find({ gig: req.params.gigId }).populate(
      "user",
      "username avatar country createdAt"
    );
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

export default { createReview, getReviews };
