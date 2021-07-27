import {
  Publisher,
  ExpirationCompletedEvent,
  Subjects,
} from "@nk-ticketing-app/common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
  readonly subject = Subjects.ExpirationCompleted;
}
