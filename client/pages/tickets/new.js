import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const NewTicket = () => {
  const [value, setValue] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    tags: [],
  });

  const [tagVal, setTagVal] = useState("");

  const { title, price, location, description, tags } = value;

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
      location,
      description,
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

  const setTags = (e) => {
    // setValue({ ...value, tags: tags.concat(e.target.value) });\
    setTagVal(e.target.value);
  };

  const onBlur = () => {
    const priceValue = parseFloat(price);

    if (isNaN(priceValue)) {
      return;
    }

    setValue({ ...value, price: priceValue.toFixed(2) });
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

        <div className="form-group">
          <label className="mt-4">Location, if any</label>
          <input
            value={location}
            name="location"
            onChange={(e) => setInput(e)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="mt-4">Description</label>
          <input
            value={description}
            name="description"
            onChange={(e) => setInput(e)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="mt-4">Tags</label>
          <input
            value={tagVal}
            name="tags"
            onChange={(e) => setTags(e)}
            className="form-control"
          />
          <button
            onClick={() => setValue({ ...value, tags: [...tags, tagVal] })}
            type="button"
            className="btn btn-link"
          >
            ADD
          </button>

          {tags?.map((tag, idx) => (
            <h2 key={idx}>{tag}</h2>
          ))}
        </div>
        {errors}
        <button className="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
