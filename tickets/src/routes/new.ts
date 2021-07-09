import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@nk-ticketing-app/common";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [body("title").not().isEmpty().withMessage("Title is required")],
  validateRequest,
  (req: Request, res: Response) => {
    console.log(req.body);
    const { title } = req.body;
    if (!title) return res.status(400);

    res.sendStatus(400);
  }
);

export { router as newRouter };
