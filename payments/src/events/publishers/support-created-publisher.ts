import {
  Subjects,
  SupportCreatedEvent,
  Publisher,
} from "@nk-ticketing-app/common";

export class SupportCreatedPublisher extends Publisher<SupportCreatedEvent> {
  readonly subject = Subjects.SupportCreated;
}
