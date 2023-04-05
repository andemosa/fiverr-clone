import { NextFunction, Request, Response } from "express";

import { Gig } from "../models/gig.model";
import { Order } from "../models/order.model";

import createError from "../utils/createError";

const createOrder = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) return next(createError(404, 5, "Gig not found"));

    if (gig) {
      const newOrder = new Order({
        gig: gig._id,
        image: gig.coverImage,
        title: gig.title,
        buyer: res.locals.userId,
        seller: gig.user,
        price: gig.price,
        payment_intent: "example",
      });

      await newOrder.save();

      res.status(201).json(newOrder);
    }
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const query = {
    ...(res.locals.isSeller
      ? { seller: res.locals.userId }
      : { buyer: res.locals.userId }),
    completed: true,
  };
  
  try {
    const orders = await Order.find(query);

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export default { createOrder, getOrders };
