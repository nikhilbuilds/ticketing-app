import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@nk-ticketing-app/common";
import { newRouter } from "./routes/new";
// import { showRouter } from "./routes/show";
// import { indexTicketRouter } from "./routes";
// import { updateTicketRouter } from "./routes/update";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);

// app.get("/api/tickets/test", currentUser, (req, res) => {
//   console.log(req.user);

//   res.send("hellocscs");
// });

app.use(newRouter);
// app.use(showRouter);
// app.use(indexTicketRouter);
// app.use(updateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
