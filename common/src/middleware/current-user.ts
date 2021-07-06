import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  user: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY as string
    ) as UserPayload;

    req.user = payload;

    return res.status(200).send({ user: payload });
  } catch (err) {}

  next();
};
