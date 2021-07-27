import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const NewTicket = () => {
  const [value, setValue] = useState({
    title: "",
    price: "",
  });

  const { title, price } = value;

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };

  const setInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setValue({ ...value, price: value.toFixed(2) });
  };

  return (
    <div>
      <form className="form-create" onSubmit={onSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Create a Ticket</h1>
        <div className="form-group">
          <label className="mt-4">Title</label>
          <input
            value={title}
            name="title"
            onChange={(e) => setInput(e)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="mt-4">Price</label>
          <input
            value={price}
            onBlur={onBlur}
            name="price"
            onChange={(e) => setInput(e)}
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
