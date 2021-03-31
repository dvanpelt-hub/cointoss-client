import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import Coins from "../components/Coins/Coins";
import CoinDetails from "../components/CoinDetails/CoinDetails";
// import Signup from "../components/Signup/Signup";
// import Login from "../components/Login/Login";
import "./App.css";

const App = () => {
  let [coinDetails, setCoinDetails] = React.useState([]);
  let [upVotes, setUpVotes] = React.useState(0);
  let [downVotes, setDownVotes] = React.useState(0);
  let [dbContents, setDbContents] = useState([]);
  let [matchedCoins, setMatchedCoins] = useState([]);
  let [currentCoins, setCurrentCoins] = useState([]);

  const updateUpVotes = () => {
    setUpVotes((upVotes += 1));
  };

  const updateDownVotes = () => {
    setDownVotes((downVotes += 1));
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          exact
          path="/coins"
          render={() => {
            return (
              <Coins
                coinDetails={coinDetails}
                updateUpVotes={updateUpVotes}
                updateDownVotes={updateDownVotes}
                upVotes={upVotes}
                downVotes={downVotes}
                dbContents={dbContents}
                setDbContents={setDbContents}
                matchedCoins={matchedCoins}
                setMatchedCoins={setMatchedCoins}
                currentCoins={currentCoins}
                setCurrentCoins={setCurrentCoins}
              />
            );
          }}
        />
        <Route
          exact
          path="/details/:id"
          render={() => {
            return (
              <CoinDetails
                coinDetails={coinDetails}
                setCoinDetails={setCoinDetails}
                upVotes={upVotes}
                setUpVotes={setUpVotes}
                downVotes={downVotes}
                setDownVotes={setDownVotes}
                dbContents={dbContents}
                setDbContents={setDbContents}
                matchedCoins={matchedCoins}
                setMatchedCoins={setMatchedCoins}
                currentCoins={currentCoins}
                setCurrentCoins={setCurrentCoins}
              />
            );
          }}
        />
        {/* <Route exact path="/Login" component={Login} />
        <Route exact path="/Signup" component={Signup} /> */}
      </Switch>
    </div>
  );
};

export default App;
