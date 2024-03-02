import React, { useEffect, useState } from "react";
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
  const [text, setText] = useState("Panruti");

  const [icon, setIcon] = useState("");
  const [temp, setTemp] = useState(18);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Ind");
  const [lat, setLAt] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const [cityNotfound, setCityNotfound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "010d": rain_icon,
    "010n": rain_icon,
    "013d": snow_icon,
    "013n": snow_icon,
  };

  const search = async () => {
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.cod == "404") {
        console.error("city not found");
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
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clear_icon);
      setCityNotfound(false);
    } catch (error) {
      console.error("An error occured:", error.message);
      setError('An Error occurred while fetching weather data')
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

  useEffect(function () {
    search();
  }, []);

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
    

     {loading && <div className="loading-message">Loading...</div> }      
     {error && <div className="error-message">{error}</div>}
      {cityNotfound && <div className="city-not-found">City not found</div>}

    {!loading && !cityNotfound && <WeatherDetails
        icon={icon}
        temp={temp}
        city={city}
        country={country}
        lat={lat}
        log={log}
        humidity={humidity}
        wind={wind}
      />}

      <p className="copyright">
        Designed by <span>Kuber</span>
      </p>
    </div>
  );
}

export default WeatherApp;
