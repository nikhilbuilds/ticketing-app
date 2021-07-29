const Mock = require("@elastic/elasticsearch-mock");
const mock = new Mock();

export async function create(id: string, title: string, tagArr: []) {
  mock.add(
    {
      method: "POST",
      path: "/indexName/_search",
    },
    () => {
      return {
        hits: {
          total: { value: 1, relation: "eq" },
          hits: [{ _source: { baz: "faz" } }],
        },
      };
    }
  );
}

export async function getSearchSuggestions(searchString: string) {
  mock.add(
    {
      method: "GET",
      path: "/:index/_count",
    },
    () => {
      return { count: 42 };
    }
  );
  client.count({ index: "foo" }, console.log); // => { count: 42 }
  client.count({ index: "bar" }, console.log); // => { count: 42 }
}
