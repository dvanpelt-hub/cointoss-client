import React, { useEffect } from "react";
import "./Coins.css";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

let DB_URL = process.env.REACT_APP_CRYPTO_DATABASE_URL;
let URL = process.env.REACT_APP_GECKO_TRENDING;

const Coins = (props) => {
  let { setDbContents } = props;
  let [currentCoins, setCurrentCoins] = React.useState([]);

  // Responsible for calling database to retrieve contents. This information is then used to identify matches with current trending dynamic data //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${DB_URL}coins`;
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
            setDbContents(responseJson);
          });
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCoins = async () => {
      // API Call to coin gecko for the top 7 trending crypto-currencies. Handled by the onClick button usage //
      fetch(URL)
        .then((response) => response.json())
        .then((responseJson) => {
          setCurrentCoins(responseJson.coins);
        })
        .catch((error) => console.log("error", error));
    };
    fetchData();
    fetchCoins();
  }, [setDbContents]);
  return (
    <div className="coins-app">
      <header className="coins-head">
        <h1>Trending Coins</h1>
      </header>
      <Nav />
      <div className="coins-holdings-table">
        <table>
          <tbody>
            {currentCoins.map((coin) => {
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coins;
