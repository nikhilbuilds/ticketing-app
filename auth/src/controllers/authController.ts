import { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request";
import { PasswordManager } from "../services/passwordManager";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  const { email, password, phone } = req.body;

  const userExist = await User.findOne({
    $or: [{ email }, { phone }],
  });

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
      id: user.id,
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

export async function signin(req: Request, res: Response) {
  const { user, password } = req.body;

  console.log(user);

  const existing = await User.findOne({
    $or: [{ email: user }, { phone: user }],
  });

  if (!existing) throw new BadRequestError("Invalid Credentials");

  const match = await PasswordManager.compare(existing.password, password);

  if (!match) throw new BadRequestError("Invalid Credentials");

  //generate JWT
  const userJwt = jwt.sign(
    {
      id: existing.id,
      email: existing.email,
    },
    process.env.JWT_KEY as string
  );

  //store jwt in session object
  req.session = {
    jwt: userJwt,
  };

  return res.status(200).send(existing);
}

export function getCurrentUser(req: Request, res: Response) {
  return res.send({ user: req.user || null });
}

export async function signout(req: Request, res: Response) {
  req.session = null;
  return res.send({});
}
