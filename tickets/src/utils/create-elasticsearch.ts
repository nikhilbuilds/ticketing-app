import { ElasticSearchConnection } from "../elasticsearch";

export async function create(title: string, tagArr: []) {
  const client = await new ElasticSearchConnection().getConnection();
  await client.index({
    index: "ticketing",
    body: {
      title: title,
      tags: tagArr,
    },
  });
}
