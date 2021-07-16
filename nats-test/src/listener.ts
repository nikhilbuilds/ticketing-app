import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listner";
const clientId = randomBytes(4).toString("hex");

console.clear();
const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  stan.on("close", () => {
    console.log("NATS CLOSED");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());

process.on("SIFTERM", () => stan.close());
