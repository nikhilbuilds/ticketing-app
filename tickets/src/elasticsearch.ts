import { Client } from "@elastic/elasticsearch";

export class ElasticSearchConnection {
  constructor() {}

  private _connection: any;

  async getConnection() {
    if (!this._connection) {
      this._connection = new Client({
        node: process.env.ES_URL,
      });
    }
    return this._connection;
  }
}
