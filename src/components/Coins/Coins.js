import React, { useEffect } from "react";
// { useEffect, useState }
import "./Coins.css";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

let DB_URL = process.env.REACT_APP_CRYPTO_DATABASE_URL;
let URL = process.env.REACT_APP_GECKO_TRENDING;

const Coins = (props) => {
  let { dbContents, setDbContents } = props;
  let [currentCoins, setCurrentCoins] = React.useState([]);
  // let [currentVotes, setCurrentVotes] = React.useState([]);
  // let [matchedVotes, setMatchedVotes] = React.useState([]);

  // Extraction of ticker_symbol from stored previously-voted on coins in database //
  // const extract1 = (array) => {
  //   let firstList = [];
  //   array.forEach((element) => {
  //     firstList.push(element.ticker_symbol);
  //   });
  //   return firstList;
  // };

  // // Extraction of id (same as ticker_symbol in database) from state which was populated from the coin gecko API call. These values are the top 7 trending coins//
  // const extract2 = (array) => {
  //   let secondList = [];
  //   array.forEach((element) => {
  //     secondList.push(element.item.id);
  //   });
  //   return secondList;
  // };

  // // // Assigning extraction functions to valiables //
  // let firstList = extract1(dbContents);
  // let secondList = extract2(currentCoins);

  // // Assigning 'matches' between two lists to variable //
  // const intersect = firstList.filter((element) => secondList.includes(element));

  // API Call to coin gecko for the top 7 trending crypto-currencies. Handled by the onClick button usage //
  const getCoins = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        setCurrentCoins(responseJson.coins);
      })
      .catch((error) => console.log("error", error));
  };

  // const setMatch = (intersect) => {
  //   console.log("test");
  //   props.setMatchedCoins(intersect);
  // };

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
    fetchData();
    // setMatchData();
  }, [setDbContents]);

  // Responsible for calling database on each 'matched' coin, returning relevant data //
  // useEffect(() => {
  // const fetchVotes = () => {
  //   intersect.map((element) => {
  //     try {
  //       const votesURL = `${DB_URL}api/v1/coins/${element}`;
  //       const options = {
  //         method: "GET",
  //         mode: "cors",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       fetch(votesURL, options)
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error("Error: " + response.status);
  //           }
  //           return response.json();
  //         })
  //         .then((responseJson) => {
  //           // setMatchedVotes((matchedVotes) => [
  //           //   ...matchedVotes,
  //           //   {
  //           //     ticker_symbol: responseJson.ticker_symbol,
  //           //     up_votes: responseJson.up_votes,
  //           //     down_votes: responseJson.down_votes,
  //           //   },
  //           // ]);
  //           // Appends each 'mapped' piece of data to the currentVotes array //
  //           // setCurrentVotes((currentVotes) => [...currentVotes, responseJson]);
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // };
  // let finalResponse = [];

  // const tester = (finalResponse) => {
  //   return matchedVotes.forEach((item) => {
  //     finalResponse[item.ticker_symbol] = {
  //       upVotes: item.up_votes,
  //       downVotes: item.down_votes,
  //     };
  //     console.log(finalResponse);
  //   });
  // };

  // const matchMaker = (id, ts) => {
  //   let response = [];
  //   matchedVotes.forEach((item) => {
  //     response[item.ticker_symbol] = {
  //       upVotes: item.up_votes,
  //       downVotes: item.down_votes,
  //     };
  //   });
  //   console.log(response);

  //   if (id === response) {
  //     return (
  //       <td className="voteOfTable">{`${response.upVotes} | ${response.downVotes}`}</td>
  //     );
  //   } else {
  //     <td className="voteOfTable">{0 | 0}</td>;
  //   }
  // };

  // console.log(props.matchedCoins);
  console.log(dbContents);
  return (
    <div className="coins-app">
      <header className="coins-head">
        <h1>Trending Coins</h1>
      </header>
      <Nav />
      <div className="getCoinsButtonArea">
        <button className="getCoinsButton" onClick={getCoins}>
          Get Coins
        </button>
        {/* <button className="getCoinsButton" onClick={fetchVotes}>
          Get Votes
        </button> */}
        {/* <button className="getCoinsButton" onClick={tester}>
          Test
        </button> */}
      </div>
      <div className="coins-holdings-table">
        <table>
          <thead>
            <tr className="tableRow">
              {/* <th className="coinHead" scope="column1">
                Coins
              </th> */}
              {/* <th className="voteHead" scope="column2">
                Votes
              </th> */}
            </tr>
          </thead>
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
                  {/* <td className="voteOfTable">{`0 | 0`}</td> */}
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
