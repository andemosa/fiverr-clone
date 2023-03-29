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

const deleteGig = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig && gig.user !== res.locals.userId)
      return next(createError(403, 3, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Gig has been deleted!",
    });
  } catch (err) {
    next(err);
  }
};

const getGig = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, 5, "Gig not found!"));
    res.status(200).json({
      success: true,
      gig,
    });
  } catch (err) {
    next(err);
  }
};

export default { createGig, getGig, deleteGig };
