import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

const LandingPage = ({ currentUser, tickets }) => {
  const [searchValues, setSearchValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    setSearchValues([]);
  }, []);

  const ticketList = tickets?.map((ticket) => {
    return (
      <div className="col-sm-4 mb-4" key={ticket.id}>
        <div className="card  bg-secondary">
          <div className="card-body">
            <h4 className="card-title">{ticket.title}</h4>

            <p className="card-text">{ticket?.location}</p>
            <p className="card-text ticket-description">
              {ticket?.description}
            </p>

            <h5>₹{ticket?.price}</h5>
            <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
              <a className="btn btn-dark">Show</a>
            </Link>
          </div>

          <div className="card-footer">
            {ticket.tags.map((tag) => {
              return (
                <button
                  type="button"
                  onClick={() => {
                    setSearchValues([]);
                    setSearchBar(tag);
                    setSearch(tag);
                  }}
                  className="btn btn-sm btn-info m-1"
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  });

  const searchSection = searchValues?.map((search, i) => {
    return (
      <Link href="/tickets/[ticketId]" as={`/tickets/${search?.id}`}>
        <li className="list-group-item">
          {search?.title}
          <br />
          <small className="text-muted">
            {search?.tags?.map((tag) => tag + " ")}
          </small>
        </li>
      </Link>
    );
  });

  async function setSearch(e) {
    const value = e.target.value;

    if (value === " " || value.length <= 0) {
      e.preventDefault();
      setSearchValues([]);
      return setSearchBar("");
    }

    setSearchBar(value);

    try {
      const res = await axios.get(
        `/api/tickets/search/suggestions?searchString=${value}`
      );

      const newArr = [];

      console.log("hello =====>", res.data);

      for (let i = 0; i < res.data.total; i++) {
        newArr[i] = {
          title: res.data.results[i].title,
          id: res.data.results[i].id,
          tags: res.data.results[i].tags,
        };
      }

      console.log("newArr", newArr);

      setSearchValues(newArr);

      return setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  // if (loading) {
  //   return (
  //     <div className="spinner-border" role="status">
  //       <span className="sr-only"></span>
  //     </div>
  //   );
  // }

  function getSearch() {
    console.log(searchValues);

    if (!searchBar) {
      setSearchValues([]);
      return setLoading(false);
    }
  }

  return (
    <div className="text-light">
      <h1 className="display-3 ">Tickets</h1>

      <div className="input-group">
        <input
          type="search"
          value={searchBar}
          className="form-control rounded"
          placeholder="Search"
          name="ticketing_search"
          onChange={(e) => setSearch(e)}
          aria-describedby="search-addon"
          autoComplete="off"
        />
        {/* <button className="btn btn-light" onClick={() => getSearch()}>
          Clear
        </button> */}
      </div>

      {searchValues.length > 0 && (
        <ul className="list-group">{searchSection}</ul>
      )}

      <div className="row mt-4  bg-dark">{ticketList}</div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
