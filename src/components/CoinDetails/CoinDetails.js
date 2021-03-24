import React, { useState, useEffect } from "react";
import "./CoinDetails.css";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";

let URL = process.env.REACT_APP_GECKO_DETAIL;

const CoinDetails = (props) => {
  const [coinDescription, setCoinDescription] = useState("");
  const [coinImage, setCoinImage] = useState("");
  const [coinFollowers, setCoinFollowers] = useState(0);
  const [icoDate, seticoDate] = useState("Not Available");
  const [coinHomepage, setCoinHomepage] = useState("Not Available");
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
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
            props.setCoinDetails(responseJson);
            setCoinDescription(responseJson.description.en);
            setCoinImage(responseJson.image.small);
            setCoinFollowers(responseJson.community_data.twitter_followers);
            seticoDate(responseJson.ico_data.ico_start_date);
            setCoinHomepage(responseJson.links.homepage[0]);
          });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  console.log(props.coinDetails);

  return (
    <div className="details-app">
      <Nav />
      <div>
        <header className="details-head">
          <h1>Coin Details</h1>
        </header>
        {/* <div className="votes">
          <button>Up Vote</button>
          <button>Down Vote</button>
        </div> */}
      </div>
      <section className="coin-details">
        <img
          src={coinImage}
          alt="image of the symbol for the selected crypto-currency"
        ></img>
        <h2>{props.coinDetails.name}</h2>
        <p>{coinDescription}</p>
        <p>Twitter Followers: {coinFollowers}</p>
        <p>ICO Date: {icoDate}</p>
        <a href={coinHomepage} className="coinLink">
          Website: {coinHomepage}
        </a>
      </section>
      <div className="getDetailsButtonArea">
        {/* <button className="getDetailsButton" onClick={getInfo}>
          Click me
        </button> */}
      </div>
    </div>
  );
};

export default CoinDetails;
