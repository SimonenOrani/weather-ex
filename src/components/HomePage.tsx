import { CloudRain, CloudSun, Cloudy, Snowflake, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { API_KEY, BaseUrl } from "../constants";
import { Link } from "react-router-dom";

const city = "Sassari";

export const HomePage = () => {
  const [weather, setWeather] = useState<any | null>(null);
  const [temp, setTemp] = useState<any | null>(null);
  const [humidity, setHumidity] = useState<any | null>(null);
  const [wind, setWind] = useState<any | null>(null);
  const [UV, setUV] = useState<any | null>(null);
  const [aqi, setAqi] = useState<any | null>(null);

  const fetchWeather = async () => {
    try {
      const url = `${BaseUrl}/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
      const response = await fetch(url);
      const data = await response.json();
      
      setWeather(data.current.condition.code);
      setTemp(data.current.temp_c);
      setHumidity(data.current.humidity);
      setWind(data.current.wind_kph);
      setUV(data.current.uv);
      setAqi(data.current.air_quality["us-epa-index"]);
    } catch (error) {
      console.error("Errore nel caricamento dati:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  function getAQI(qualitaAria: number) {
    const levels: { [key: number]: string } = {
      1: "Buona", 2: "Moderata", 3: "Malsana (sensibili)", 
      4: "Malsana", 5: "Molto malsana", 6: "Pericolosa"
    };
    return levels[qualitaAria] || "N/A";
  }

  function getCondition(condizione: number) {
    if (condizione === 1000) return <Sun />;
    if (condizione === 1003) return <CloudSun />;
    if ([1006, 1009, 1030, 1135, 1147].includes(condizione)) return <Cloudy />;
    if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(condizione)) return <CloudRain />;
    return <Snowflake />;
  }

  return (
    <div className="weather-container">
      <Link to="/other-cities">Vedi le altre città</Link>
      <div className="weather-card">
        <h1 className="weather-title"> Meteo di {city}: </h1>
        {weather && getCondition(weather)}
        <h1 className="weather-title"> Temperatura: {temp}°</h1>
        <div className="weather-details">
          <h3 className="weather-data"> Umidità: {humidity}%</h3>
          <h3 className="weather-data"> Vento: {wind}km/h</h3>
          <h3 className="weather-data"> Indice UV: {UV}</h3>
          <h3 className="weather-data"> Qualità Aria: {aqi && getAQI(aqi)}</h3>
        </div>
      </div>
    </div>
  );
};

export default HomePage;