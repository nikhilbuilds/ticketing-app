import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listner,
  OrderCancelledEvent,
  NotFoundError,
} from "@nk-ticketing-app/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticketing";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listner<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { ticket } = data;
    const getTicket = await Ticket.findById(ticket.id);

    if (!getTicket) throw new NotFoundError();

    getTicket.set({ orderId: undefined });

    await getTicket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: getTicket.id,
      orderId: getTicket.orderId,
      userId: getTicket.userId,
      price: getTicket.price,
      title: getTicket.title,
      version: getTicket.version,
    });

    msg.ack();
  }
}
