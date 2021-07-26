import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@nk-ticketing-app/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
