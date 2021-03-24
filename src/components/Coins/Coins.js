import React from "react";
import "./Coins.css";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

const Coins = (props) => {
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
        </div>
      </div>
    </div>
  );
};

export default Coins;
