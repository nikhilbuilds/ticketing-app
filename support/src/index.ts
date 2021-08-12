import mongoose from "mongoose";
import { natsWrapper } from "../src/nats-wrapper";

import { SupportCreatedListener } from "./events/listeners/support-created-listener";

const start = async () => {
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("MONGO_URI must be defined");
  if (!process.env.NATS_CLIENT_ID) throw new Error("MONGO_URI must be defined");
  if (!process.env.NATS_URL) throw new Error("MONGO_URI must be defined");

  console.log("Support is up");

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new SupportCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);
  }
};

start();
