import { Message } from "node-nats-streaming";
import {
  TicketCreatedEvent,
  Listner,
  Subjects,
} from "@nk-ticketing-app/common";
import { queueGroupName } from "./queueGroupName";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listner<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price, version } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
      version,
    });

    await ticket.save();

    msg.ack();
  }
}
