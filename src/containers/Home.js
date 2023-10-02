import React from "react";

const Home = () => {
  return (
    <main className="home">
      <h1> Weather Today from Feras</h1>
      <div className="hot">
        <span className="sun"></span>
        <span className="sunx"></span>
      </div>
      <div className="cloudy">
        <span className="cloud"></span>
        <span className="cloudx"></span>
      </div>
      <div className="stormy">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <span className="snowe"></span>
        <span className="snowex"></span>
        <span className="stick"></span>
        <span className="stick2"></span>
      </div>
      <div className="breezy">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <span className="cloudr"></span>
      </div>
      <div className="night">
        <span className="moon"></span>
        <span className="spot1"></span>
        <span className="spot2"></span>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </main>
  );
};

export default Home;
