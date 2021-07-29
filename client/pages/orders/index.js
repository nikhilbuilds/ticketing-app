const OrderIndex = ({ orders }) => {
  return (
    <>
      <h1 className="display-3">My Orders</h1>
      {orders?.map((order) => {
        return (
          <div className="card text-light bg-secondary m-4">
            <div className="card-header">OrderId: {order.id}</div>
            <div className="card-body">
              <h5 className="card-title">Event: {order.ticket.title}</h5>
              <p className="card-text">Location: {order.ticket.location}</p>
            </div>
            <div className="card-footer">
              <b>Status: {order.status}</b>
            </div>
          </div>
        );
      })}
    </>
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
