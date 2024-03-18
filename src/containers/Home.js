import React, { useState } from "react";

const Home = () => {
  const [hotdays, sethotdays] = useState(0);
  const [snowdays, setsnowdays] = useState(0);
  const [cloudydays, setcloudydays] = useState(0);
  const [hazydays, sethazydays] = useState(0);
  const [raindays, setraindays] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://albrecht.pythonanywhere.com/get_data"
      );
      const data = await response.json();
      const hotsdayslen = data.data.filter((item) => item.tempdeg > 25 &&item.humdeg <40 );
      const snowdayslen = data.data.filter((item) => item.tempdeg < 10);
      const rainingdays = data.data.filter((item) => item.humdeg > 80);
      const hazydayslen = data.data.filter((item) => item.humdeg < 25);
      const cloudydayslen = data.data.filter((item) => item.tempdeg > 25 && item.humdeg > 80 );

      sethotdays(hotsdayslen.length);
      setsnowdays(snowdayslen.length);
      sethazydays(hazydayslen.length);
      setraindays(rainingdays.length);
      setcloudydays(cloudydayslen.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
  return (
    <main className="home">
      <h1> Statistiken zum Wetter </h1>
      <div className="hot">
        <span className="sun"></span>
        <label>{hotdays}</label>
        <span className="sunx"></span>
      </div>
      <div className="cloudy">
        <label>{hazydays}</label>

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
        <label>{snowdays}</label>
      </div>
      <div className="breezy">
        <label>{raindays}</label>

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
      <label>{cloudydays}</label>

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
