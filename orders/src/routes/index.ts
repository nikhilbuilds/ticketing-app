import express, { Request, Response } from "express";
import { requireAuth } from "@nk-ticketing-app/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({
      userId: req.user!.id,
    }).populate("ticket");

    return res.send(orders);
  } catch (err) {
    console.log(err);
  }
});

export { router as indexOrderRouter };
