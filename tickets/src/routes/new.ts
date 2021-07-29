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
import { create } from "../utils/create-elasticsearch";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("location").not().isEmpty().withMessage("Location is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price, location, description, tags } = req.body;

    const tagArr: [] = tags.split(",");

    try {
      const ticket = Ticket.build({
        title,
        price,
        userId: req.user!.id,
        location,
        description,
        tags: tagArr,
      });
      await ticket.save();

      //send to elastic search

      create(ticket.title, ticket?.tags || []);

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
