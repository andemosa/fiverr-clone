import { NextFunction, Request, Response } from "express";

import { Gig } from "../models/gig.model";

import { CreateGigInput } from "../schema/gig.schema";

import createError from "../utils/createError";

interface IQuery {
  user: string;
  category: string;
  search: string;
  sort: string;
  min: number;
  max: number;
}

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

    if (!gig) next(createError(404, 5, "Gig not found!"));

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
    const gig = await Gig.findById(req.params.id).populate(
      "user",
      "username avatar country createdAt description"
    );
    if (!gig) next(createError(404, 5, "Gig not found!"));
    res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};

const getGigs = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response,
  next: NextFunction
) => {
  const q = req.query;
  const filters = {
    ...(q.user && { user: { $regex: q.user, $options: "i" } }),
    ...(q.category && { category: { $regex: q.category, $options: "i" } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters)
      .populate("user", "username avatar")
      .sort({ [q.sort]: -1 });
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};

export default { createGig, getGig, deleteGig, getGigs };
