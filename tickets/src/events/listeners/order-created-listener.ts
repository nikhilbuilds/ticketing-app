import {
  Listener,
  OrderCreatedEvent,
  Subjects,
  NotFoundError,
} from "@nk-ticketing-app/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticketing";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { ticket } = data;
    const getTicket = await Ticket.findById(ticket.id);

    if (!getTicket) throw new NotFoundError();

    getTicket.set({ orderId: data.id });

    await getTicket.save();

    new TicketUpdatedPublisher(this.client).publish({
      id: getTicket.id,
      price: getTicket.price,
      title: getTicket.title,
      userId: getTicket.userId,
      orderId: getTicket.orderId,
      version: getTicket.version,
    });

    msg.ack();
  }
}
