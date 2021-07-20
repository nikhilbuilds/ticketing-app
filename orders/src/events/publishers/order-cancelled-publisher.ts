import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@nk-ticketing-app/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
