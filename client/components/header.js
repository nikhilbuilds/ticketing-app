import Link from "next/link";
import { useState } from "react";

export default ({ currentUser }) => {
  const [showNav, setNav] = useState(false);

  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup", isNew: false },
    !currentUser && { label: "Sign In", href: "/auth/signin", isNew: false },
    currentUser && {
      label: "Sell Tickets",
      href: "/tickets/new",
      isNew: false,
    },
    currentUser && { label: "My Orders", href: "/orders", isNew: false },
    currentUser && { label: "Sign Out", href: "/auth/signout", isNew: false },
    {
      label: "Github",
      href: "https://github.com/nikhil-web-dev/ticketing-app",
      isNew: true,
    },
    {
      label: "Documentation",
      href: "https://docs.google.com/document/d/1K6H7cJf2meOdugvDHWsICZ9yJOS6ntolr2xVJNegxgg/edit?usp=sharing",
      isNew: true,
    },
    {
      label: "devnikhil.com",
      href: "https://devnikhil.com",
      isNew: true,
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, isNew }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} target={isNew && "_blank"}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="container navbar navbar-expand-lg navbar-dark bg-dark mb-5 justify-content-center align-items-center">
      <button
        className={`navbar-toggler ${!showNav && "collapsed"} `}
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded={showNav}
        aria-label="Toggle navigation"
        onClick={() => setNav(!showNav)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link href="/">
        <a className="navbar-brand" href="#">
          ticketing.devnikhil.com
        </a>
      </Link>

      <div
        className={`collapse navbar-collapse ${showNav && "show"}`}
        id="navbarTogglerDemo03"
      >
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">{links}</ul>
        {/* <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form> */}
      </div>
    </nav>
  );
};
