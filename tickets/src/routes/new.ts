import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  currentUser,
  requireAuth,
  validateRequest,
} from "@nk-ticketing-app/common";
import { Ticket } from "../models/ticketing";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price, location, description } = req.body;

    try {
      const ticket = Ticket.build({
        title,
        price,
        userId: req.user!.id,
        location,
        description,
      });
      await ticket.save();

      new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version,
        location: ticket.location,
        description: ticket.description,
      });

      return res.status(201).send(ticket);
    } catch (err) {
      console.log(err.message);
      return err;
    }
  }
);

export { router as createTicketRouter };
