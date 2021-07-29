import { Client } from "@elastic/elasticsearch";
import fs from "fs";

export class ElasticSearchConnection {
  constructor() {}

  private _connection: any;

  async getConnection() {
    if (!this._connection) {
      this._connection = new Client({
        cloud: {
          id: "ticketing-devnikhil:ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJDY4ZmY2NzhlMzNlZjRmNzFhZjc3OWM1M2JmOTEzZGMxJDkxZGExNDhjOWFhMzRlOGY5MTJkZDJkNDJjNDE4NDMw",
        },
        auth: {
          username: "elastic",
          password: "KIGkICBRFSMBlZN6Cpbb3don",
        },
      }); // use the same version of your Elasticsearch instance
    }
    return this._connection;
  }
}
