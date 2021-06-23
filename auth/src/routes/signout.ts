import express from "express";
import { currentUser } from "../controllers/authController";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.send("hello");
});

export { router as apiRouter };
