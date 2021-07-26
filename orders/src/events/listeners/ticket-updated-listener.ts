import { Message } from "node-nats-streaming";
import {
  TicketUpdatedEvent,
  Listner,
  Subjects,
  NotFoundError,
} from "@nk-ticketing-app/common";
import { queueGroupName } from "./queueGroupName";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listner<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;

  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    console.log(data);

    //find ticket
    const ticket = await Ticket.findById({ _id: id });
    if (!ticket) throw new NotFoundError();

    ticket.set({ title, price });

    await ticket.save();

    msg.ack();
  }
}
