import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";

import { Gig } from "../models/gig.model";
import { Order } from "../models/order.model";

import createError from "../utils/createError";

const createOrder = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const stripe = new Stripe(process.env.STRIPE!, {
    apiVersion: "2022-11-15",
  });

  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) return next(createError(404, 5, "Gig not found"));

    if (gig) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      const newOrder = new Order({
        gig: gig._id,
        image: gig.coverImage,
        title: gig.title,
        buyer: res.locals.userId,
        seller: gig.user,
        price: gig.price,
        payment_intent: paymentIntent.id,
      });

      await newOrder.save();

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
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
    const orders = await Order.find(query).populate(["buyer", "seller"]);

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export default { createOrder, getOrders };
