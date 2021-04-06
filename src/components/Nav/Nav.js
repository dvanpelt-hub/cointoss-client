import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="Nav">
      <Link className="landing" to="/">
        Home
      </Link>
      <Link className="coins" to="/coins">
        Coins
      </Link>
    </div>
  );
}

export default Nav;
