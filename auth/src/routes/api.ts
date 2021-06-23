import express from "express";
import { currentUser, signup } from "../controllers/authController";
import { body } from "express-validator";

const router = express.Router();

router.get("/current", currentUser);

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password between  4 and 20 characters are allowed"),
  ],
  signup
);

export { router as apiRouter };
