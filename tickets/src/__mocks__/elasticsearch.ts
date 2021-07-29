const { Client } = require("@elastic/elasticsearch");
const Mock = require("@elastic/elasticsearch-mock");
const mock = new Mock();
const client = new Client({
  node: "http://localhost:9200",
  Connection: mock.getConnection(),
});
mock.add(
  {
    method: "GET",
    path: "/",
  },
  () => {
    return { status: "ok" };
  }
);
client.info(console.log);
