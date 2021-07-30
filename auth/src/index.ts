import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT KEY IS MISSING");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongo db");
  } catch (err) {
    console.error(err);
  }

  app.get("/api/auth/test", (req, res) => {
    res.send("This is a auth service- testing 2");
  });

  app.listen(process.env.AUTH_SERVICE_PORT, () => {
    console.log(
      "Auth-Service is running on port:" + process.env.AUTH_SERVICE_PORT
    );
  });
};

start();
