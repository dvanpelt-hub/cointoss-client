import React from "react";
import "./LandingPage.css";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div className="landing-head">
        <header className="cointoss-head">
          <Link className="headCoinLink" to="/coins">
            <h1>Coin Toss</h1>
          </Link>
        </header>
        <Nav />
        <div className="slogan">
          <section className="slogan">
            <h2>
              Trending cryptocurrencies in the palm of your hand. Cast your
              votes!
            </h2>
            <div className="landing-info">
              <p>This is information for the app. How to use it, etc.</p>
            </div>
          </section>
        </div>
      </div>
      <section className="info">Second Section</section>
    </>
  );
}

export default LandingPage;
