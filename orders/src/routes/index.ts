import express from "express";
import { requireAuth } from "@nk-ticketing-app/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req, res) => {
  const orders = await Order.find({
    userId: req.user!.id,
  }).populate("ticket");

  return res.send(orders);
});

export { router as indexOrderRouter };
