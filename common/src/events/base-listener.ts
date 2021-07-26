import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subject";

interface Events {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Events> {
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  abstract subject: T["subject"];
  abstract queueGroupName: string;

  protected ackwait = 5 * 1000;
  abstract onMessage(data: T["data"], msg: Message): void;

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackwait)
      .setDurableName(this.queueGroupName);
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString());
  }

  listen() {
    const sub = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    sub.on("message", (msg: Message) => {
      console.log("Message" + this.subject + this.queueGroupName);

      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    });
  }
}
