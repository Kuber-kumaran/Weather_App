import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../../Assets/search.png";
import clear_icon from "../../Assets/clear copy.png";
import cloud_icon from "../../Assets/cloud.png";
import drizzle_icon from "../../Assets/drizzle.png";
import rain_icon from "../../Assets/rain.png";
import snow_icon from "../../Assets/snow.png";
import humidity_icon from "../../Assets/humidity.png";
import wind_icon from "../../Assets/wind.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="weather-image">
        <img src={icon} alt="" />
      </div>
      <div className="weather-temp">{temp}°C</div>
      <div className="weather-location">
        {city}:<span className="country">({country})</span>
      </div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function WeatherApp() {
  let api_key = "40550f692d8ee62e83d8863e039577cb";
  const [text, setText] = useState("Chennai");

  const [icon, setIcon] = useState(snow_icon);
  const [temp, setTemp] = useState(18);
  const [city, setCity] = useState("Panruti");
  const [country, setCountry] = useState("Ind");
  const [lat, setLAt] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const[cityNotfound, setCityNotfound] = useState(false);
  const[loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      if(data.cod == "404"){
        console.error('city not found');
        setCityNotfound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCity(data.name);
      setCountry(data.sys.country);
      setTemp(data.main.temp);
      setLAt(data.coord.lat);
      setLog(data.coord.lon);



    } catch (error) {
      console.error("An error occured:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="search"
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <WeatherDetails
        icon={icon}
        temp={temp}
        city={city}
        country={country}
        lat={lat}
        log={log}
        humidity={humidity}
        wind={wind}
      />

      <p className="copyright">
        Designed by <span>Kuber</span>
      </p>
    </div>
  );
}

export default WeatherApp;
