import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="Nav">
      <div className="dropdown">
        <span>Menu</span>
        <div className="dropdown-content">
          <Link className="landing" to="/">
            Landing Page
          </Link>
          <Link className="coins" to="/coins">
            Coins
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
