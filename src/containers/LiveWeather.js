import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
const LiveWeather = () => {
  const [selectedStation, setselectedStation] = useState("1");
  const [Record, setRecord] = useState({
    device: "1",
    gas: "51.12",
    day: "",
    time: "",
    humdeg: "56.51",
    preasure: "100.29",
    tempdeg: "23.23",
  });
  const [Precite, setPrecite] = useState({
    predicted_gas: "35.0",
    predicted_hum: "40.0",
    predicted_preasure: "79.0",
    predicted_temperature: "21.82",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://albrecht.pythonanywhere.com/get_data"
      );
      const data = await response.json();

      const devicedata = data.data.filter(
        (item) => item.device === selectedStation
      );
      devicedata.sort((a, b) => {
        const timeA = new Date(a.date);
        const timeB = new Date(b.date);
        return timeA - timeB;
      });

      const latresult = devicedata[devicedata.length - 1];

      const inputDate = new Date(latresult.date); // Assuming inputDate is in UTC
      // Adjust the time of the inputDate
  
      // Format time as "23:56"
      const formattedTime = `${("0" + inputDate.getHours()).slice(-2)}:${(
        "0" + inputDate.getMinutes()
      ).slice(-2)}`;

      // Format day as "MON 08-23"
      const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
        inputDate.getUTCDay()
      ];
      const formattedDay = `${dayOfWeek} ${(
        "0" +
        (inputDate.getUTCMonth() + 1)
      ).slice(-2)}.${("0" + inputDate.getFullYear()).slice(-2)}`;

  let finalobj = {
    device: latresult.device,
    gas: latresult.gas,
    day: formattedDay,
    time:formattedTime,
    humdeg: latresult.humdeg,
    preasure: latresult.preasure,
    tempdeg: latresult.tempdeg,
  }
      setRecord(finalobj);
      console.log(Record);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPredicate = async () => {
    try {
      const res = await fetch(
        "http://albrecht.pythonanywhere.com/predict_temperatures"
      );
      const resdata = await res.json();

      const Predicatedata = resdata.data.filter(
        (item) => item.device === selectedStation
      );
      Predicatedata.sort((a, b) => {
        const timeA = new Date(a.date);
        const timeB = new Date(b.date);
        return timeA - timeB;
      });

      const lresult = Predicatedata[Predicatedata.length - 1];
      const random = Math.random();

      // Scale and shift the random number to be between -5.00 and 5.00
      const scaledRandom = random * 10.0 - 5.0;
      const scal = parseFloat(scaledRandom.toFixed(2));

      // Assuming lresult.predicted_gas is a string representing a float
      const gas = parseFloat(lresult.predicted_gas);
      
      const totalGas = gas + scal;
     console.log(totalGas)
      let finalob = {
        predicted_gas: parseFloat(gas).toFixed(2) ,
        predicted_hum: parseFloat(lresult.predicted_hum).toFixed(2) ,
        predicted_preasure: parseFloat(lresult.predicted_preasure).toFixed(2),
        predicted_temperature: parseFloat(lresult.predicted_temperature).toFixed(2),
      }
      setPrecite(finalob);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPredicate();
  }, [selectedStation]);

  return (
    <main className="live">
      <div className="card first-card">
        <div className="card-block">
          <div className="card-title">
            <FontAwesomeIcon icon={faSun} />
            <small>Sunny</small>
            <h1>{Record.tempdeg}°</h1>
            <small>42°/28°</small>
          </div>
          <div className="card-text">
            <h4>{Record.time}</h4>
            <h6>{Record.day}</h6>
            <p>Station {Record.device}</p>
          </div>

          <div className="card-select">
            <label>Select Station</label>
            <select
              value={selectedStation}
              onChange={(e) => setselectedStation(e.target.value)}
            >
              <option value="1">Main Station</option>
              <option value="2">Second Station</option>
            </select>
          </div>
          <div className="card-list">
            <label className="btnlabel btn-secondary">Temperature</label>
            <label className="btnlabel primary">Humidity</label>
            <label className="btnlabel btn-success">Atmospheric Pressure</label>
            <label className="btnlabel btn-warning">Gas</label>
          </div>
          <div className="card-select">
            <label>Predicted Weather For Next time </label>
          </div>
          <div className="card-list">
            <label className="btnlabel btn-secondary">
              {Record.tempdeg} (°C)
            </label>
            <label className="btnlabel btn-primary">{Record.humdeg} (%)</label>
            <label className="btnlabel btn-success">
              {Record.preasure} (hpa/10)
            </label>
            <label className="btnlabel btn-warning">{Record.gas} (K0hms)</label>
          </div>

          <div className="card-select">
            <label>Predicted Weather For Next time </label>
          </div>
          <div className="card-list">
            <label className="btnlabel btn-secondary">
              {Precite.predicted_temperature}
            </label>
            <label className="btnlabel btn-primary">
              {Precite.predicted_hum}
            </label>
            <label className="btnlabel btn-success">
              {Precite.predicted_preasure}
            </label>
            <label className="btnlabel btn-warning">
              {Precite.predicted_gas}
            </label>
          </div>
        </div>
      </div>
    </main>
  );
};
export default LiveWeather;
