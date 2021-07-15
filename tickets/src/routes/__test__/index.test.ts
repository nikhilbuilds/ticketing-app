import request from "supertest";
import { app } from "../../app";

it("fetching a list", async () => {
  const createTicket = async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "abcd",
        price: 20,
      });
  };

  createTicket();
  createTicket();
  createTicket();

  const res = await request(app).get("/api/tickets").send();

  expect(res.body.length).toEqual(3);
});
