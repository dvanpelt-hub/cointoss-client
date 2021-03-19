import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import ICOs from "../components/ICOs/ICOs";
import CoinDetails from "../components/CoinDetails/CoinDetails";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/icos" component={ICOs} />
        <Route exact path="/details" component={CoinDetails} />
      </Switch>
    </div>
  );
}

export default App;
