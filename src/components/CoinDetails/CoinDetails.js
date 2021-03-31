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
  const DB_URL = process.env.REACT_APP_DATABASE_URL;

  const updateUpVotes = () => {
    setMatchedUpVotes((matchedUpVotes += 1));
    console.log(matchedUpVotes);
    // return matchedUpVotes;
  };

  const updateDownVotes = () => {
    setMatchedDownVotes((matchedDownVotes += 1));
    console.log(matchedDownVotes);
    // return matchedDownVotes;
  };

  useEffect(() => {
    // add in coin price fetch call here //

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

  const updateVotes = () => {
    const postData = async () => {
      try {
        const url = `${DB_URL}api/v1/coins`;
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
            setMatchedUpVotes(responseJson.up_votes);
            setMatchedDownVotes(responseJson.down_votes);
            return responseJson;
          });
      } catch (err) {
        console.log(err);
      }
    };
    postData();
  };

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const votesURL = `${DB_URL}api/v1/coins/${id}`;
        const options = {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        fetch(votesURL, options)
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
          Post
        </button>
        {/* <button onClick={fetchVotes} className="getVotesButton">
          Votes
        </button> */}
      </div>
      <section className="coin-details">
        <img
          src={coinImage}
          alt="symbol for the selected crypto-currency"
        ></img>
        <h2>Current Price = ${parseFloat(currentPrice).toFixed(2)}</h2>
        <p>{coinDescription}</p>
        <p>Twitter Followers: {coinFollowers}</p>
        <a href={coinHomepage} className="coinLink">
          Website: {coinHomepage}
        </a>
      </section>
    </div>
  );
};

export default CoinDetails;
