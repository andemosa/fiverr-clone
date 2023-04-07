import { NextFunction, Request, Response } from "express";

import { Conversation } from "../models/conversation.model";
import { CreateConversationInput } from "../schema/conversation.schema";

import createError from "../utils/createError";

const createConversation = async (
  req: Request<{}, {}, CreateConversationInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.userId === req.body.to)
    return next(createError(422, 3, "Cannot create conversation with self"));

  const newConversation = new Conversation({
    id: res.locals.isSeller
      ? `${res.locals.userId}-${req.body.to}`
      : `${req.body.to}-${res.locals.userId}`,

    seller: res.locals.isSeller ? res.locals.userId : req.body.to,

    buyer: res.locals.isSeller ? req.body.to : res.locals.userId,

    lastMessage: "",
    readBySeller: res.locals.isSeller,
    readByBuyer: !res.locals.isSeller,
  });

  try {
    const conversation = await Conversation.findOne({
      id: res.locals.isSeller
        ? res.locals.userId + req.body.to
        : req.body.to + res.locals.userId,
    });

    if (conversation)
      return next(createError(422, 3, "Conversation already exists!"));

    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (err) {
    next(err);
  }
};

const updateConversation = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(res.locals.isSeller
            ? { readBySeller: true }
            : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    if (!updatedConversation)
      return next(createError(404, 5, "Conversation not found"));

    res.status(200).json(updatedConversation);
  } catch (err) {
    next(err);
  }
};

const getSingleConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const conversation = await Conversation.findOne({
      id: req.params.id,
    }).populate(["buyer", "seller"]);
    if (!conversation)
      return next(createError(404, 5, "Conversation not found!"));
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};

const getConversations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const conversations = await Conversation.find(
      res.locals.isSeller
        ? { seller: res.locals.userId }
        : { buyer: res.locals.userId }
    )
      .populate(["buyer", "seller"])
      .sort({ updatedAt: -1 });
    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
};

export default {
  createConversation,
  updateConversation,
  getConversations,
  getSingleConversation,
};
