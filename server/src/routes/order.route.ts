import express from "express";

import orderCtrl from "../controllers/order.controller";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";

const orderRouter = express.Router();

orderRouter.post(
  "/:id",
  verifyToken,
  orderCtrl.createOrder
);
orderRouter.get(
  "/",
  verifyToken,
  orderCtrl.getOrders
);

export default orderRouter;
