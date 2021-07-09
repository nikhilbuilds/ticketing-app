import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for api request ", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).not.toEqual(404);
});

it("if only user is signed in ", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("if user is signed in, status is not 401 ", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(res.status).not.toEqual(401);
});

it("returns an error, if title is invalid ", async () => {
  // const res = await request(app)
  //   .post("/api/tickets")
  //   .set("Cookie", global.signin())
  //   .send({
  //     title: "",
  //     price: 10,
  //   })
  //   .expect(400);

  // console.log(res);

  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send()
    .expect(400);
});
it("returns an error, if price is invalid ", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asldkjf",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "laskdfj",
    })
    .expect(400);
});

it("creates a ticket with valid inputs ", async () => {});
