import { NextFunction, Request, Response } from "express";

import { Gig } from "../models/gig.model";

import { CreateGigInput } from "../schema/gig.schema";

import createError from "../utils/createError";

const createGig = async (
  req: Request<{}, {}, CreateGigInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.isSeller)
    return next(createError(403, 3, "Only sellers can create a gig!"));

  const newGig = new Gig({
    user: res.locals.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

export default { createGig };
