import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";
import { natsWrapper } from "../src/nats-wrapper";

dotenv.config();
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("MONGO_URI must be defined");
  if (!process.env.NATS_CLIENT_ID) throw new Error("MONGO_URI must be defined");
  if (!process.env.NATS_URL) throw new Error("MONGO_URI must be defined");

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

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(4000, () => {
    console.log("Ticketing service, Listening on port 4000!!!!!!!!");
  });
};

start();
