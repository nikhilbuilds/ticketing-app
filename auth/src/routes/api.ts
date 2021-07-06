import express from "express";
import {
  signup,
  signin,
  signout,
  getCurrentUser,
} from "../controllers/authController";
import { body } from "express-validator";
import { validateRequest, currentUser } from "@nk-ticketing-app/common";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password between  4 and 20 characters are allowed"),
    body("phone")
      .isLength({ min: 10, max: 10 })

      .withMessage("Valid phone number is required")
      .notEmpty(),
  ],
  validateRequest,
  signup
);

router.post(
  "/signin",
  [
    body("user").notEmpty().withMessage("Email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validateRequest,

  signin
);

router.post("/signout", signout);

router.get("/current", currentUser, getCurrentUser);

export { router as apiRouter };
