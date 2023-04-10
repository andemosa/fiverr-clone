import express from "express";

import messageCtrl from "../controllers/message.controller";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";

import { CreateMessageSchema } from "../schema/message.schema";

const messageRouter = express.Router();

messageRouter.post(
  "/",
  verifyToken,
  validate(CreateMessageSchema),
  messageCtrl.createMessage
);
messageRouter.get("/:id", verifyToken, messageCtrl.getMessages);

export default messageRouter;
