import { NextFunction, Request, Response } from "express";

import { Conversation } from "../models/conversation.model";
import { Message } from "../models/message.model";

import { CreateMessageInput } from "../schema/message.schema";

import createError from "../utils/createError";

const createMessage = async (
  req: Request<{}, {}, CreateMessageInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  const memberIds = req.body.conversation.split("-");

  //prevent just anyone from creating a message
  if (!memberIds.includes(res.locals.userId))
    return next(
      createError(403, 3, "Cannot create a message in this conversation")
    );

  const newMessage = new Message({
    conversation: req.body.conversation,
    user: res.locals.userId,
    content: req.body.content,
  });
  try {
    const savedMessage = await (await newMessage.save()).populate("user");
    await Conversation.findOneAndUpdate(
      { id: req.body.conversation },
      {
        $set: {
          readBySeller: res.locals.isSeller,
          readByBuyer: !res.locals.isSeller,
          lastMessage: req.body.content,
        },
      },
      { new: true }
    );

    res.status(201).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

const getMessages = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const conversation = Conversation.findOne({
      id: req.params.id,
    }).populate(["buyer", "seller"]);
    const messages = Message.find({
      conversation: req.params.id,
    }).populate("user");

    const result = await Promise.all([conversation, messages]);

    res.status(200).json({
      messages: result[1],
      seller: result[0]?.seller,
      buyer: result[0]?.buyer,
    });
  } catch (err) {
    next(err);
  }
};

export default { createMessage, getMessages };
