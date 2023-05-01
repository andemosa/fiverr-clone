import express from "express";

import orderCtrl from "../controllers/order.controller";

import { verifyToken } from "../middleware/jwt";

const orderRouter = express.Router();

orderRouter.post("/:id", verifyToken, orderCtrl.createOrder);
orderRouter.get("/", verifyToken, orderCtrl.getOrders);
orderRouter.patch("/", verifyToken, orderCtrl.confirmOrder);

export default orderRouter;
