import {
  Subjects,
  PaymentCreatedEvent,
  Publisher,
} from "@nk-ticketing-app/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
