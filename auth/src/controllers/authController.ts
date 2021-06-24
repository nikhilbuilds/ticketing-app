import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { BadRequestError } from "../errors/bad-request";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export function currentUser(req: Request, res: Response) {
  res.send("hello22");
}

export async function signup(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

  const { email, password, phone } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) throw new BadRequestError("User already exist");

  //user instance
  const user = User.build({
    email,
    password,
    phone,
  });

  //save user
  await user.save();

  //generate JWT
  const userJwt = jwt.sign(
    {
      if: user.id,
      email: user.email,
    },
    process.env.JWT_KEY as string
  );

  //store jwt in session object
  req.session = {
    jwt: userJwt,
  };

  return res.status(201).send(user);
}
