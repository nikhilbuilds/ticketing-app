import {
  Publisher,
  Subjects,
  OrderCreatedEvent,
} from "@nk-ticketing-app/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
