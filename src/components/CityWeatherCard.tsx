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
    const props = { className: "weather-icon", size: 64 };
    if (code === 1000) return <Sun {...props} color="#fbbf24" />;
    if (code === 1003) return <CloudSun {...props} color="#fcd34d" />;
    if ([1006, 1009, 1030].includes(code)) return <Cloudy {...props} color="#94a3b8" />;
    if ([1063, 1183, 1189, 1240].includes(code)) return <CloudRain {...props} color="#38bdf8" />;
    return <Snowflake {...props} color="#bae6fd" />;
  }

  const getAQIDesc = (val: number) => {
    const map: any = { 1: "Ottima", 2: "Buona", 3: "Moderata", 4: "Bassa", 5: "Pessima", 6: "Critica" };
    return map[val] || "N/D";
  };

  if (!data) return <div className="weather-card" style={{opacity: 0.5}}>Caricamento...</div>;

  return (
    <div className="weather-card">
      <h3 className="weather-title">{nomeCitta}</h3>
      <span className="condition-label">{data.current.condition.text}</span>
      
      <div style={{ margin: '20px 0' }}>
        {getConditionIcon(data.current.condition.code)}
      </div>
      
      <div className="temp-display">{Math.round(data.current.temp_c)}°</div>

      <div className="weather-details">
        <div className="weather-data">
          <span><Droplets size={14}/> Umidità</span>
          <strong>{data.current.humidity}%</strong>
        </div>
        <div className="weather-data">
          <span><Wind size={14}/> Vento</span>
          <strong>{Math.round(data.current.wind_kph)} <small>km/h</small></strong>
        </div>
        <div className="weather-data">
          <span><Zap size={14}/> Indice UV</span>
          <strong>{data.current.uv}</strong>
        </div>
        <div className="weather-data">
          <span><Activity size={14}/> Aria</span>
          <strong style={{ color: data.current.air_quality["us-epa-index"] <= 2 ? '#4ade80' : '#f87171' }}>
            {getAQIDesc(data.current.air_quality["us-epa-index"])}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default CityWeatherCard;