import express from "express";

import conversationCtrl from "../controllers/conversation.controller";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";

import { CreateConversationSchema } from "../schema/conversation.schema";

const conversationRouter = express.Router();

conversationRouter.post("/", verifyToken, validate(CreateConversationSchema), conversationCtrl.createConversation);
conversationRouter.get("/", verifyToken, conversationCtrl.getConversations);
conversationRouter.get(
  "/:id",
  verifyToken,
  conversationCtrl.getSingleConversation
);
conversationRouter.patch(
  "/:id",
  verifyToken,
  conversationCtrl.updateConversation
);

export default conversationRouter;
