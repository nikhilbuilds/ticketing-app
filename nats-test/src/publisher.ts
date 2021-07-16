import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedPublisher } from "./events/tickets-created-publisher";
console.clear();

const clientId = randomBytes(4).toString("hex");

const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);

  // const data = JSON.stringify({ id: "123", title: "Hell", price: 20 });

  // stan.publish("ticket:created", data, () => {
  //   console.log("Published");
  // });

  try {
    await publisher.publish({ id: "123", title: "NATS_TEST", price: 20 });
  } catch (err) {
    console.log(err);
  }
});
