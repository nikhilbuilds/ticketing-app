import {
  Listener,
  SupportCreatedEvent,
  Subjects,
} from "@nk-ticketing-app/common";
import { Message } from "node-nats-streaming";
import sgMail from "@sendgrid/mail";

export class SupportCreatedListener extends Listener<SupportCreatedEvent> {
  readonly subject = Subjects.SupportCreated;

  queueGroupName = "support-service";

  async onMessage(data: SupportCreatedEvent["data"], msg: Message) {
    console.log(
      "SUPPORT__LISTENER_SERVICE=================================>",
      data
    );
    // send mail, basis on type..
    //  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    sgMail.setApiKey(
      "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"
    );
    const sendData = {
      to: data.customerEmail, // Change to your recipient
      from: "alxnetwork.nikhil@gmail.com", // Change to your verified sender
      subject: "Payment",
      text: data.message,
    };
    sgMail
      .send(sendData)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    msg.ack();
  }
}
