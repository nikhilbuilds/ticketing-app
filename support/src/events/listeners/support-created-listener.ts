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

    console.log(process.env.SG_MAIL_KEY, process.env.SG_SENDER_MAIL);

    // send mail, basis on type..
    sgMail.setApiKey(process.env.SG_MAIL_KEY as string);
    //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
    const sendData = {
      to: data.customerEmail,
      from: process.env.SG_SENDER_MAIL as string,
      subject: "Payment",
      text: data.message,
    };
    sgMail
      .send(sendData)
      .then(() => {
        console.log("Email sent");
        return msg.ack();
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
        return msg.ack();
      });
    msg.ack();
  }
}
