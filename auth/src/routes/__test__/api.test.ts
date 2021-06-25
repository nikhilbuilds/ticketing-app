import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      phone: "1234567890",
    })
    .expect(201);
});

it("returns a 400 on invalid signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "password",
      phone: "1234567890",
    })
    .expect(400);
});

it("returns a 400 on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "d",
      phone: "1234567890",
    })
    .expect(400);
});

it("returns a 400 with missing emial and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", phone: "1234567890" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "1234", phone: "1234567890" })
    .expect(400);
});

it("do not allow duplicate email and phone", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", phone: "1234567890", password: "1234" })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", phone: "1234567890", password: "1234" })
    .expect(400);
});

it("sets a cokkie after successfull signupp", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", phone: "1234567890", password: "1234" })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});

// it("returns a 201 on successful signin", async () => {
//   return request(app)
//     .post("/api/users/signin")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(201);
// });
