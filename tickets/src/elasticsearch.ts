import { Client } from "@elastic/elasticsearch";

export class ElasticSearchConnection {
  constructor() {}

  private _connection: any;

  async getConnection() {
    if (!this._connection) {
      this._connection = new Client({
        cloud: {
          id: process.env.ES_CLOUD_ID as string,
        }, //ES_CLOUD_ID
        auth: {
          username: process.env.ES_AUTH_USER as string, //ES_AUTH_USER
          password: process.env.ES_AUTH_PASSWORD as string, //ES_AUTH_PASSWORD
        },
      });
    }
    return this._connection;
  }
}
