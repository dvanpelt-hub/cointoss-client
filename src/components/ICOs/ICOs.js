import "./ICOs.css";
import Nav from "../Nav/Nav";

function ICOs() {
  return (
    <div className="ICO-app">
      <header className="ICOs-head">
        <h1>Upcoming ICOs</h1>
      </header>
      <Nav />
      <div className="ICO-holdings-table">
        <table>
          <thead>
            <tr className="tableRow">
              <th scope="column1">Coin</th>
              <th scope="column2">ICO Date</th>
              <th scope="column3">Tweet Count</th>
              <th scope="column3">Votes</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default ICOs;
