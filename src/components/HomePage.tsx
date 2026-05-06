import { useState, useEffect } from "react";
import { API_KEY, BaseUrl } from "../constants";
import { Link } from "react-router-dom";
import { WeatherCard } from "./WeatherCard";

const city = "Sassari";

export const HomePage = () => {
  const [weather, setWeather] = useState<any | null>(null);
  const [temp, setTemp] = useState<any | null>(null);
  const [humidity, setHumidity] = useState<any | null>(null);
  const [wind, setWind] = useState<any | null>(null);
  const [UV, setUV] = useState<any | null>(null);
  const [aqi, setAqi] = useState<any | null>(null);

  const fetchWeather = async () => {
    const url = `${BaseUrl}/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
    const response = await fetch(url);
    const data = await response.json();

    setWeather(data.current.condition.code);
    setTemp(data.current.temp_c);
    setHumidity(data.current.humidity);
    setWind(data.current.wind_kph);
    setUV(data.current.uv);
    setAqi(data.current.air_quality["us-epa-index"]);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="page-container">
      <div className="top-bar">
        <h1>Meteo</h1>
        <Link to="/other-cities" className="btn">
          🌍 Vedi altre città
        </Link>
      </div>

      {temp !== null ? (
        <WeatherCard
          city={city}
          temp={temp}
          humidity={humidity}
          wind={wind}
          uv={UV}
          aqi={aqi}
          conditionCode={weather}
        />
      ) : (
        <p className="loading-text">Caricamento dati in corso...</p>
      )}
    </div>
  );
};

export default HomePage;