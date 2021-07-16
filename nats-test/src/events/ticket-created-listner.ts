import { Listner } from "./base-listner";
import { Subjects } from "./subject";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listner<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    // console.log(data.id);
    // console.log(data.title);
    // console.log(data.price);

    msg.ack();
  }
}
