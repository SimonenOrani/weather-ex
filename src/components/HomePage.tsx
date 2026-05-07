import { CloudRain, CloudSun, Cloudy, Snowflake, Sun, Wind, Droplets, Zap, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { API_KEY, BaseUrl } from "../constants";
import { Link } from "react-router-dom";

const CITY = "Sassari";

export const HomePage = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `${BaseUrl}/current.json?key=${API_KEY}&q=${CITY}&aqi=yes`;
        const response = await fetch(url);
        const resData = await response.json();
        setData(resData);
      } catch (error) {
        console.error("Errore:", error);
      }
    };
    fetchWeather();
  }, []);

  function getConditionIcon(code: number) {
    const props = { className: "weather-icon", size: 100 };
    if (code === 1000) return <Sun {...props} color="#FFD700" />;
    if (code === 1003) return <CloudSun {...props} color="#F0E68C" />;
    if ([1006, 1009, 1030].includes(code)) return <Cloudy {...props} color="#B0C4DE" />;
    if ([1063, 1183, 1189, 1240].includes(code)) return <CloudRain {...props} color="#00BFFF" />;
    return <Snowflake {...props} color="#AFEEEE" />;
  }

  // Funzione uniformata per la descrizione della qualità dell'aria
  const getAQIDesc = (val: number) => {
    const map: any = { 
      1: "Ottima", 
      2: "Buona", 
      3: "Moderata", 
      4: "Bassa", 
      5: "Pessima", 
      6: "Critica" 
    };
    return map[val] || "N/D";
  };

  if (!data) return <div className="weather-container">Caricamento meteo...</div>;

  const aqiIndex = data.current.air_quality["us-epa-index"];

  return (
    <div className="weather-container">
      <Link to="/other-cities">Esplora altre città</Link>
      
      <div className="weather-card" style={{ maxWidth: '500px', margin: '40px auto' }}>
        <span style={{ color: '#38bdf8', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem' }}>Posizione Attuale</span>
        <h1 className="weather-title">{CITY}</h1>
        <p style={{ opacity: 0.8, marginBottom: '10px' }}>{data.current.condition.text}</p>
        
        {getConditionIcon(data.current.condition.code)}
        
        <div className="temp-display">{Math.round(data.current.temp_c)}°C</div>

        <div className="weather-details">
          <div className="weather-data">
            <span><Droplets size={14}/> Umidità</span>
            <strong>{data.current.humidity}%</strong>
          </div>
          <div className="weather-data">
            <span><Wind size={14}/> Vento</span>
            <strong>{data.current.wind_kph} km/h</strong>
          </div>
          <div className="weather-data">
            <span><Zap size={14}/> Indice UV</span>
            <strong>{data.current.uv}</strong>
          </div>
          <div className="weather-data">
            <span><Activity size={14}/> Aria</span>
            <strong style={{ color: aqiIndex <= 2 ? '#4ade80' : '#f87171' }}>
              {getAQIDesc(aqiIndex)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;