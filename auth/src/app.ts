import express, { Application, Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
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

export { app };

//kubectl create secret generic jwt-secret --from-literal=JWT_KEY=wg+3W9j-??m=j%Y2
