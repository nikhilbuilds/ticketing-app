import { Client } from "@elastic/elasticsearch";

export class ElasticSearchConnection {
  constructor() {}

  private _connection: any;

  async getConnection() {
    if (!this._connection) {
      this._connection = new Client({
        node: "http://elasticsearch-loadbalancer:9200",
      });
    }
    return this._connection;
  }
}
