import express, { Request, Response } from "express";
import { Ticket } from "../models/ticketing";
import { NotFoundError } from "@nk-ticketing-app/common";
const router = express.Router();

router.get("/api/tickets/:id", async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) throw new NotFoundError();

  return res.send(ticket);
});

export { router as showRouter };
