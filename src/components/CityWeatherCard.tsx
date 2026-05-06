import { useState, useEffect } from "react";
import { API_KEY, BaseUrl } from "../constants";
import { CloudRain, CloudSun, Cloudy, Snowflake, Sun, Wind, Droplets, Zap, Activity } from "lucide-react";

interface CityCardProps {
  nomeCitta: string;
}

const CityWeatherCard = ({ nomeCitta }: CityCardProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        const url = `${BaseUrl}/current.json?key=${API_KEY}&q=${nomeCitta}&aqi=yes`;
        const response = await fetch(url);
        const resData = await response.json();
        setData(resData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCityWeather();
  }, [nomeCitta]);

  function getConditionIcon(code: number) {
    const props = { className: "weather-icon" };
    if (code === 1000) return <Sun {...props} color="#FFD700" />;
    if (code === 1003) return <CloudSun {...props} color="#F0E68C" />;
    if ([1006, 1009, 1030].includes(code)) return <Cloudy {...props} color="#B0C4DE" />;
    if ([1063, 1183, 1189, 1240].includes(code)) return <CloudRain {...props} color="#00BFFF" />;
    return <Snowflake {...props} color="#AFEEEE" />;
  }

  const getAQIDesc = (val: number) => {
    const map: any = { 1: "Ottima", 2: "Moderata", 3: "Bassa", 4: "Mala", 5: "Pessima", 6: "Rischio" };
    return map[val] || "N/D";
  };

  if (!data) return <div className="weather-card">Caricamento...</div>;

  return (
    <div className="weather-card">
      <h3 className="weather-title">{nomeCitta}</h3>
      <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '10px' }}>{data.current.condition.text}</p>
      
      {getConditionIcon(data.current.condition.code)}
      
      <div className="temp-display">{Math.round(data.current.temp_c)}°</div>

      <div className="weather-details">
        <div className="weather-data">
          <span><Droplets size={12}/> Umidità</span>
          <strong>{data.current.humidity}%</strong>
        </div>
        <div className="weather-data">
          <span><Wind size={12}/> Vento</span>
          <strong>{Math.round(data.current.wind_kph)} km/h</strong>
        </div>
        <div className="weather-data">
          <span><Zap size={12}/> Indice UV</span>
          <strong>{data.current.uv}</strong>
        </div>
        <div className="weather-data">
          <span><Activity size={12}/> Aria</span>
          <strong>{getAQIDesc(data.current.air_quality["us-epa-index"])}</strong>
        </div>
      </div>
    </div>
  );
};

export default CityWeatherCard;