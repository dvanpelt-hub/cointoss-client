import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="Nav">
      <Link className="landing" to="/">
        Landing Page
      </Link>
      <br />
      <Link className="icos" to="/icos">
        ICOs
      </Link>
      <br />
      <Link className="details" to="/details">
        ICO Details
      </Link>
    </div>
  );
}

export default Nav;
