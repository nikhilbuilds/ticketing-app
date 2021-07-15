import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns 404, if id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "abcd",
      price: 20,
    })
    .expect(404);
});

it("returns 401, if not authorized", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "abcd",
      price: 20,
    })
    .expect(401);
});

it("returns 401, if user does not own the ticket", async () => {
  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({
      title: "abcd",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "abcd",
      price: 20,
    })
    .expect(401);
});

it("updates tickets", async () => {
  const cookie = global.signin();

  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "abcd",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "abcd",
      price: 20,
    })
    .expect(200);

  const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send();

  expect(ticketRes.body.title).toEqual("abcd");
});
