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

it("sets a cokkie after successfull signup", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", phone: "1234567890", password: "1234" })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});

it("failes when email doesnot exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ user: "abc@def.com", password: "12345" })
    .expect(400);
});

it("failes when password is incorrect", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test2@test.com",
      password: "password",
      phone: "1234567890",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ user: "test2@test.com", password: "p" })
    .expect(400);
});

it("get cookie on successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test2@test.com",
      password: "password",
      phone: "1234567890",
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signin")
    .send({ user: "test2@test.com", password: "password" })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});

it("clear cookie on signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test2@test.com",
      password: "password",
      phone: "1234567890",
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  //  console.log(res.get("Set-Cookie"));

  expect(res.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});

it("get current user", async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .get("/api/users/current")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  console.log(res.body);

  expect(res.body.user.email).toEqual("test@test.com");
});

it("user not authenticated", async () => {
  const res = await request(app).get("/api/users/current").send().expect(200);

  console.log(res.body);

  expect(res.body.currentUser).toEqual(null);
});
