import React from "react";
import "./LandingPage.css";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-head">
      <header className="cointoss-head">
        <Link className="headCoinLink" to="/coins">
          <h1>Coin Toss</h1>
        </Link>
      </header>
      <Nav />
      <div className="slogan">
        <section className="slogan">
          <h2>Trending cryptocurrencies in the palm of your hand</h2>
          <div className="landing-info">
            <p>
              View the top seven trending cryptocurrencies on Coin Gecko and
              cast your votes for your favorites!
            </p>
          </div>
          <div className="getStarted">
            <p className="start">
              Select the Coin Toss icon below to get started!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
