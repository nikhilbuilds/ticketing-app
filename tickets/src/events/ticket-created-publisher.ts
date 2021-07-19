import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@nk-ticketing-app/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
