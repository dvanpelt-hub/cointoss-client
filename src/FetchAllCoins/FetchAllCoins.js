const FetchAllCoins = (props) => {
  const fetchData = async (props) => {
      console.log(process.env.REACT_APP_DATABASE_URL);
      try {
        let DB_URL = process.env.REACT_APP_DATABASE_URL;
        const url = `${DB_URL}api/v1/coins`;
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
            props.setDbContents(responseJson);
          });
      } catch (err) {
        console.log(err);
      }
      fetchData();
    },
    [];
};
export default FetchAllCoins;

{
  /* {currentCoins.map((coin) => {
                    return coin.item.id === intersect[0] ? (
                      <td className="voteOfTable">{`1 | 1`}</td>
                    ) : (
                      <td className="voteOfTable">{`0 | 0`}</td>
                    );
                  })} */
}

// const fetchVotes = () => {
//   intersect.map((element) => {
//     return async () => {
//       try {
//         const votesURL = `${DB_URL}api/v1/coins/decentraland`;
//         const options = {
//           method: "GET",
//           mode: "cors",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         };
//         await fetch(votesURL, options)
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Error: " + response.status);
//             }
//             return response.json();
//           })
//           .then((responseJson) => {
//             console.log(responseJson);
//           });
//       } catch (err) {
//         console.log(err);
//       }
//     };
