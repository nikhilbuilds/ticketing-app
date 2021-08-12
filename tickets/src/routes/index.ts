import express from "express";
import { Ticket } from "../models/ticketing";
import { getSearchSuggestions } from "../utils/create-elasticsearch";

const router = express.Router();

router.get("/api/tickets", async (req, res) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });

  return res.send(tickets);
});

router.get("/api/tickets/search/suggestions", async (req, res) => {
  const { searchString } = req.query;
  const search = await getSearchSuggestions(searchString as string);

  return res.send(search);
});

export { router as indexTicketRouter };
