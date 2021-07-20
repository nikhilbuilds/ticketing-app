import express from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@nk-ticketing-app/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders/:orderId", requireAuth, async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) throw new NotFoundError();

  if (order.userId !== req.user!.id) throw new NotAuthorizedError();

  return res.send(order);
});

export { router as showOrderRouter };
