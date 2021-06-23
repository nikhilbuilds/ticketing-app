import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export function currentUser(req: Request, res: Response) {
  res.send("hello22");
}

export function signup(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

  const { email, password } = req.body;

  console.log("creating a user");

  throw new DatabaseConnectionError();

  res.send({});
}
