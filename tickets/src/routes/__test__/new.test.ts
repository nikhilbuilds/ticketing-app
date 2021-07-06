import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for api request ", async () => {
  const res = await request(app).post("/api/tickets").send({});

  expect(res.status).not.toEqual(404);
});

it("if only user is signed in ", async () => {
  const res = await await request(app)
    .post("/api/tickets")
    .send({})
    .expect(401);
});

it("if user is signed in, status is not 401 ", async () => {
  const res = await await request(app).post("/api/tickets").send({});

  expect(res.status).not.toEqual(401);
});

it("returns an error, if title is invalid ", async () => {});
it("returns an error, if price is invalid ", async () => {});
it("creates a ticket with valid inputs ", async () => {});
