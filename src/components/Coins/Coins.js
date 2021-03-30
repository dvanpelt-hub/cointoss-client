import React, { useEffect } from "react";
import "./Coins.css";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

let DB_URL = process.env.REACT_APP_DATABASE_URL;

const Coins = (props) => {
  const fetchData = async () => {
    try {
      const url = `${DB_URL}`;
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="coins-app">
      <header className="coins-head">
        <h1>Trending Coins</h1>
      </header>
      <Nav />
      <div className="coins-holdings-table">
        <table>
          <thead>
            <tr className="tableRow">
              <th className="coinHead" scope="column1">
                Coin
              </th>
              <th className="voteHead" scope="column2">
                Votes
              </th>
            </tr>
          </thead>
          <tbody>
            {props.currentCoins.map((coin) => {
              return (
                <tr key={coin.item.id} className="listedCoins">
                  <td>
                    <Link
                      className="coinOfTable"
                      to={`/details/${coin.item.id}`}
                    >
                      {coin.item.name}
                    </Link>
                  </td>
                  <td className="voteOfTable">{`${props.upVotes} | ${props.downVotes}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="getCoinsButtonArea">
          <button className="getCoinsButton" onClick={props.getCoins}>
            Get Coins
          </button>
          <button onClick={fetchData}>Test</button>
        </div>
      </div>
    </div>
  );
};

export default Coins;
