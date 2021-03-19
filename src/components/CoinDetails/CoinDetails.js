import "./CoinDetails.css";
import Nav from "../Nav/Nav";

function CoinDetails() {
  return (
    <div className="details-app">
      <header className="details-head">
        <h1>CoinDetails</h1>
      </header>
      <Nav />
      <section className="tweet-details">
        <ul className="tweets">
          <li>Tweet 1</li>
          <li>Tweet 2</li>
          <li>Tweet 3</li>
          <li>Tweet 4</li>
          <li>Tweet 5</li>
        </ul>
      </section>
    </div>
  );
}

export default CoinDetails;
