import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

//for global properties
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "wg+3W9j-??m=j%Y2";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

//global functions for test Env
global.signin = async () => {
  const email = "test@test.com";
  const password = "password";
  const phone = "0123456789";

  const res = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
      phone,
    })
    .expect(201);

  return res.get("Set-Cookie");
};
