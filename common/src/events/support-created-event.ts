import { Subjects } from "./subject";

export interface SupportCreatedEvent {
  subject: Subjects.SupportCreated;
  data: {
    orderId?: string;
    orderStatus?: string;
    amount?: number;
    customerEmail: string;
    type: string; //enum;;
    message: string;
  };
}
