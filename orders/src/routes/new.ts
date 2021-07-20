import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  requireAuth,
  NotFoundError,
  BadRequestError,
} from "@nk-ticketing-app/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 5 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Ticket is invalid"),
  ],
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError();

    const isReserved = await ticket.isReserved();

    if (!isReserved) throw new BadRequestError("Ticket is already reserved");

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId: req.user!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });

    await order.save();

    return res.status(201).send(order);
  }
);

export { router as IndexOrderRouter };
