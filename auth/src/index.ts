import express, { Application, Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import dotenv from "dotenv";
import { apiRouter } from "./routes/api";
import { errorHandler } from "./middleware/error-handle";
import { NotFoundError } from "./errors/not-found-error";

dotenv.config();
const app: Application = express();

app.use(json());

app.use("/api/users", apiRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(process.env.AUTH_SERVICE_PORT, () => {
  console.log(
    "Auth-Service is running on port:" + process.env.AUTH_SERVICE_PORT
  );
});
