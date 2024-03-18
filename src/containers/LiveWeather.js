import React, { useState, useEffect } from "react";
import Sunnyimg from '../assets/Sunny.jpeg'; 
import hazyimg from '../assets/Hazy.jpeg'; 
import Cloudyimg from '../assets/Cloudy.jpeg'; 

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

  function generateRandomNumber() {
    // Generate a random number between 0 and 2
    const randomNumber = Math.random() * 3;
  
    // Shift the range to -1 to 1
    const scaledRandomNumber = randomNumber - 1;
  
    return  parseFloat(scaledRandomNumber).toFixed(2);
  }

  const determineBackgroundImage = () => {
    if (Record.tempdeg > 25) {
      return `url(${Sunnyimg})`;
    } else if (Record.tempdeg > 10) {
      return `url(${Cloudyimg})`;
    } else {
      return `url(${hazyimg})`;
    }
  };

  const divStyle = {
    backgroundImage: determineBackgroundImage(),
  };


  const getTemperatureIcon = () => {
    const tempValue = parseFloat(Record.tempdeg);

    if (tempValue > 25) {
      return faSun;
    } else if (tempValue >= 10 && tempValue <= 25) {
      return faCloud;
    } else {
      return faAlignJustify;
    }
  };


  const gettempweather = () => {
    const tempValue = parseFloat(Record.tempdeg);

    if (tempValue > 25) {
      return "Sunny";
    } else if (tempValue >= 10 && tempValue <= 25) {
      return "Cloudy";
    } else {
      return "Hazy";
    }
  };

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


     

    
      const humpre =  parseFloat(lresult.predicted_hum) + parseFloat(generateRandomNumber())  ;
      const prepre =  parseFloat(lresult.predicted_preasure) + parseFloat(generateRandomNumber())  ;
      const gaspre =  parseFloat(lresult.predicted_gas) + parseFloat(generateRandomNumber())  ;

  
      let finalob = {
        predicted_gas: parseFloat(gaspre).toFixed(2) ,
        predicted_hum: parseFloat(humpre).toFixed(2) ,
        predicted_preasure: parseFloat(prepre).toFixed(2),
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
    getTemperatureIcon();

    const intervalId = setInterval(fetchData, 3000);
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [selectedStation]);

  return (
    <main className="live">
      <div className="card first-card" style={divStyle}>
        <div className="card-block">
          <div className="card-title">
            <FontAwesomeIcon icon={getTemperatureIcon()} />
            <small>{gettempweather()}</small>
            <h1>{Record.tempdeg}°</h1>
            <small>{parseInt(Record.tempdeg) +5 + "°"+ "/"  + parseInt(Record.tempdeg-5) + "°"} </small>
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
              <option value="1"> Station 1</option>
              <option value="2"> Station 2</option>
                    <option value="3"> Station 3</option>
                    <option value="4"> Station 4</option>
                    <option value="5"> Station 5</option>
                    <option value="6"> Station 6</option>
                    <option value="7"> Station 7</option>
                    <option value="8"> Station 8</option>
                    <option value="9"> Station 9</option>
                    <option value="10"> Station 10</option>

            </select>
          </div>
          <div className="card-list">
            <label className="btnlabel btn-red" >Temperature</label>
            <label className="btnlabel btn-blue">Humidity</label>
            <label className="btnlabel btn-yellow">Atmospheric Pressure</label>
            <label className="btnlabel btn-green">Gas</label>
          </div>
          <div className="card-select">
            <label>Current Data </label>
          </div>
          <div className="card-list">
            <label className="btnlabel btn-red">
              {Record.tempdeg} (°C)
            </label>
            <label className="btnlabel btn-primary">{Record.humdeg} (%)</label>
            <label className="btnlabel btn-yellow">
              {Record.preasure} (hpa/10)
            </label>
            <label className="btnlabel btn-green">{Record.gas} (K0hms)</label>
          </div>

          <div className="card-select">
            <label>Predicted Weather For Next time </label>
          </div>
          <div className="card-list">
            <label className="btnlabel btn-red">
              {Precite.predicted_temperature}  (°C)
            </label>
            <label className="btnlabel btn-primary">
         {Precite.predicted_hum} (%)
            </label>
            <label className="btnlabel btn-yellow">
              {Precite.predicted_preasure} (hpa/10)
            </label>
            <label className="btnlabel btn-green">
              {Precite.predicted_gas} (K0hms)
            </label>
          </div>
        </div>
      </div>
    </main>
  );
};
export default LiveWeather;
