import React from "react";
import "./LandingPage.css";
import Nav from "../Nav/Nav";

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="cointoss-head">
        <h1>Coin Toss</h1>
      </header>
      <Nav />
      <div className="slogan">
        <h2>ICO forecasting made easier</h2>
        <div className="landing-info">
          <p>This is information for the app. How to use it, etc.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
