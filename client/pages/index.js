import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <div className="col-sm-6 mb-4" key={ticket.id}>
        <div className="card  bg-secondary">
          <div className="card-body">
            <h4 className="card-title">{ticket.title}</h4>
            <p className="card-text">{ticket?.location}</p>
            <p className="card-text">{ticket?.description}</p>

            <h5>₹{ticket?.price}</h5>
            <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
              <a className="btn btn-dark">Show</a>
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="text-light">
      <h1>Tickets</h1>

      <div className="row  bg-dark">{ticketList}</div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
