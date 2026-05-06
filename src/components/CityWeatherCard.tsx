import { useState, useEffect } from "react";
import { API_KEY, BaseUrl } from "../constants";
import { CloudRain, CloudSun, Cloudy, Snowflake, Sun } from "lucide-react";

interface CityCardProps {
  nomeCitta: string;
}

const CityWeatherCard = ({ nomeCitta }: CityCardProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        const url = `${BaseUrl}/current.json?key=${API_KEY}&q=${nomeCitta}&aqi=no`;
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
    if (code === 1000) return <Sun />;
    if (code === 1003) return <CloudSun />;
    if ([1006, 1009, 1030].includes(code)) return <Cloudy />;
    if ([1063, 1183, 1189, 1240].includes(code)) return <CloudRain />;
    return <Snowflake />;
  }

  if (!data) return <div>Caricamento {nomeCitta}...</div>;

  return (
    <div className="weather-card">
      <h3>{nomeCitta}</h3>
      {getConditionIcon(data.current.condition.code)}
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{data.current.temp_c}°C</p>
      <p>Umidità: {data.current.humidity}%</p>
      <p>{data.current.condition.text}</p>
    </div>
  );
};

export default CityWeatherCard;