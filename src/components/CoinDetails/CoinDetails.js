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
  // const [icoDate, seticoDate] = useState("Not Available");
  const [coinHomepage, setCoinHomepage] = useState("Not Available");
  const [currentPrice, setCurrentPrice] = useState("Not Available");
  let { id } = useParams();
  let { setCoinDetails, upVotes, downVotes, setUpVotes, setDownVotes } = props;
  const DB_URL = process.env.REACT_APP_TEST_URL;

  const updateUpVotes = () => {
    setUpVotes((upVotes += 1));
    return upVotes;
  };

  const updateDownVotes = () => {
    setDownVotes((downVotes += 1));
    return downVotes;
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
            // console.log(responseJson);
            setCurrentPrice(responseJson.market_data.current_price.usd);
            setCoinDetails(responseJson);
            setCoinDescription(responseJson.description.en);
            setCoinImage(responseJson.image.small);
            setCoinFollowers(responseJson.community_data.twitter_followers);
            // seticoDate(responseJson.ico_data.ico_start_date);
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
    // seticoDate,
    setCoinHomepage,
  ]);

  // NEED TO FIX WEBSITE AND ICO DATE CALL //
  const updateVotes = () => {
    const postData = async () => {
      try {
        const url = `${DB_URL}/`;
        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticker_symbol: id,
            up_votes: upVotes,
            down_votes: downVotes,
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
            console.log(responseJson);
            // setUpVotes(responseJson.up_votes);
            // setDownVotes(responseJson.down_votes);
            return responseJson;
          });
      } catch (err) {
        console.log(err);
      }
    };
    postData();
  };

  return (
    <div className="details-app">
      <Nav />
      <div>
        <header className="details-head">
          <h1>{props.coinDetails.name}</h1>
        </header>
      </div>
      <div className="votes-area">
        <span>Up Votes: {upVotes}</span>
        <span>Down Votes: {downVotes}</span>
      </div>
      <div className="getVotesButtonArea">
        <button onClick={updateUpVotes} className="getVotesButton">
          Up Vote
        </button>
        <button onClick={updateDownVotes} className="getVotesButton">
          Down Vote
        </button>
        <button onClick={updateVotes} className="getVotesButton">
          Test
        </button>
      </div>
      <div>
        {/* <p>{upVotes}</p> */}
        {/* <p>{downVotes}</p> */}
      </div>
      <section className="coin-details">
        <img
          src={coinImage}
          alt="symbol for the selected crypto-currency"
        ></img>
        <h2>Current Price = ${parseFloat(currentPrice).toFixed(2)}</h2>
        <p>{coinDescription}</p>
        <p>Twitter Followers: {coinFollowers}</p>
        {/* <p>ICO Date: {icoDate}</p> */}
        <a href={coinHomepage} className="coinLink">
          Website: {coinHomepage}
        </a>
      </section>
    </div>
  );
};

export default CoinDetails;
