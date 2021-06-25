import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT KEY IS MISSING");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongo db");
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.AUTH_SERVICE_PORT, () => {
    console.log(
      "Auth-Service is running on port:" + process.env.AUTH_SERVICE_PORT
    );
  });
};

start();
