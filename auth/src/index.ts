import express, { Application, Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { apiRouter } from "./routes/api";
import { errorHandler } from "./middleware/error-handle";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";

dotenv.config();
const app: Application = express();

app.use(json());

//trust traffic
app.set("trust proxy", true);

//encryption not needed
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use("/api/users", apiRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

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
