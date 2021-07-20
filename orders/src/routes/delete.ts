import express from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from "@nk-ticketing-app/common";
import { Order } from "../models/order";

const router = express.Router();

router.delete("/api/orders/:orderId", requireAuth, async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) throw new NotFoundError();

  if (order.userId !== req.user!.id) throw new NotAuthorizedError();

  order.status = OrderStatus.Cancelled;

  await order.save();

  return res.status(204).send(order);
});

export { router as deleteOrderRouter };
