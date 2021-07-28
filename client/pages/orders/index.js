const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  console.log(context?.query?.order_id);
  if (context?.query?.order_id) {
    try {
      await client.post("/api/payments/notify", {
        data: {
          order_id: context?.query?.order_id,
          order_token: context?.query?.order_token,
        },
      });
    } catch (err) {
      console.log(err?.data?.errors);
    }
  }
  const { data } = await client.get("/api/orders");
  return { orders: data };
};

export default OrderIndex;
