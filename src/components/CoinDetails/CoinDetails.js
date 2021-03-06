import React, { useState, useEffect } from "react";
import "./CoinDetails.css";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";

let URL = process.env.REACT_APP_GECKO_DETAIL;

const CoinDetails = (props) => {
  const [coinDescription, setCoinDescription] = useState(
    "No description available"
  );
  const [coinImage, setCoinImage] = useState("");
  const [coinFollowers, setCoinFollowers] = useState(0);
  const [coinHomepage, setCoinHomepage] = useState("Not Available");
  const [currentPrice, setCurrentPrice] = useState("Not Available");
  let [matchedUpVotes, setMatchedUpVotes] = useState(0);
  let [matchedDownVotes, setMatchedDownVotes] = useState(0);
  let { id } = useParams();
  let { setCoinDetails } = props;
  const DB_URL = process.env.REACT_APP_CRYPTO_DATABASE_URL;

  const updateUpVotes = () => {
    setMatchedUpVotes(parseInt((matchedUpVotes += 1)));
  };

  const updateDownVotes = () => {
    setMatchedDownVotes(parseInt((matchedDownVotes += 1)));
  };

  useEffect(() => {
    // Fetch details of coin from Coin Gecko API and set to state //
    const fetchCoinData = async () => {
      try {
        const url = `${URL}/${id}`;
        await fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error: " + response.status);
            }
            return response.json();
          })
          .then((responseJson) => {
            setCurrentPrice(responseJson.market_data.current_price.usd);
            setCoinDetails(responseJson);
            setCoinDescription(responseJson.description.en);
            setCoinImage(responseJson.image.small);
            setCoinFollowers(responseJson.community_data.twitter_followers);
            setCoinHomepage(responseJson.links.homepage[0]);
          });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchCoinData();
  }, [
    id,
    setCurrentPrice,
    setCoinDetails,
    setCoinDescription,
    setCoinImage,
    setCoinFollowers,
    setCoinHomepage,
  ]);

  // Posts new votes to database and updates state //
  const updateVotes = () => {
    const postData = async () => {
      try {
        const url = `${DB_URL}coins`;
        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticker_symbol: id,
            up_votes: matchedUpVotes,
            down_votes: matchedDownVotes,
          }),
        };
        await fetch(url, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error: " + response.status);
            }
            return response.json();
          })
          .then((responseJson) => {
            setMatchedUpVotes(parseInt(responseJson.up_votes));
            setMatchedDownVotes(parseInt(responseJson.down_votes));
            alert("You have cast your vote successfully!");
            return responseJson;
          });
      } catch (err) {
        console.log(err);
      }
    };
    postData();
  };

  // Fetches details from database pertaining to the selected coin //
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const votesURL = `${DB_URL}coins/${id}`;
        const options = {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
        await fetch(votesURL, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error: " + response.status);
            }
            return response.json();
          })
          .then((responseJson) => {
            setMatchedUpVotes(parseInt(responseJson.up_votes));
            setMatchedDownVotes(parseInt(responseJson.down_votes));
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchVotes();
  }, [DB_URL, id]);

  return (
    <div className="details-app">
      <Nav />
      <div>
        <header className="details-head">
          <h1>{props.coinDetails.name}</h1>
        </header>
      </div>
      <div className="votes-area">
        <span>Up Votes: {matchedUpVotes}</span>
        <span>Down Votes: {matchedDownVotes}</span>
      </div>
      <div className="getVotesButtonArea">
        <button onClick={updateUpVotes} className="getVotesButton">
          Up Vote
        </button>
        <button onClick={updateDownVotes} className="getVotesButton">
          Down Vote
        </button>
        <button onClick={updateVotes} className="getVotesButton">
          Post Vote
        </button>
      </div>
      <section className="coin-details">
        <img
          src={coinImage}
          alt="symbol for the selected crypto-currency"
        ></img>
        <h2>Current Price = ${parseFloat(currentPrice).toFixed(2)}</h2>
        <p>{coinDescription}</p>
        <hr />
        <p className="twitterFollowers">Twitter Followers: {coinFollowers}</p>
        <a href={coinHomepage} className="coinLink">
          Website: {coinHomepage}
        </a>
      </section>
    </div>
  );
};

export default CoinDetails;
