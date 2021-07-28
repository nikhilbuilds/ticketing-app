import { Message } from "node-nats-streaming";
import {
  TicketCreatedEvent,
  Listener,
  Subjects,
} from "@nk-ticketing-app/common";
import { queueGroupName } from "./queueGroupName";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price, location, description } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
      location,
      description,
    });

    await ticket.save();

    msg.ack();
  }
}
