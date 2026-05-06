import { CloudRain, CloudSun, Cloudy, Snowflake, Sun } from "lucide-react";
import { useState } from "react";
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
    const url = `${BaseUrl}/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
    const response = await fetch(url);
    const data = await response.json();
    const condizione = data.current.condition.text;
    const temperatura = data.current.temp_c;
    const umidita = data.current.humidity;
    const vento = data.current.wind_kph;
    const indiceUV = data.current.uv;
    const qualitaAria = data.current.air_quality["us-epa-index"];

    setWeather(data.current.condition.code);
    setTemp(temperatura);
    setHumidity(umidita);
    setWind(vento);
    setUV(indiceUV);
    setAqi(qualitaAria);

    console.log(data);

    return {
      condizione: condizione,
      temperatura: temperatura,
      umidita: umidita,
      vento: vento,
      indiceUV: indiceUV,
      qualitaAria: qualitaAria,
    };
  };

  function getAQI(qualitaAria: number) {
    switch (qualitaAria) {
      case 1:
        return "Bouna";

      case 2:
        return "Moderata";

      case 3:
        return "Malsana (gruppi sensibili)";

      case 4:
        return "Malsana";

      case 5:
        return "Molto malsana";

      case 6:
        return "Pericolosa";

      default:
        break;
    }
  }

  function getCondition(condizione: number) {
    switch (condizione) {
      case 1000:
        return <Sun />;

      case 1003:
        return <CloudSun />;

      case 1006:
      case 1009:
      case 1030:
      case 1135:
      case 1147:
        return <Cloudy />;

      case 1063:
      case 1150:
      case 1153:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1240:
      case 1243:
      case 1246:
        return <CloudRain />;

      case 1066:
      case 1114:
      case 1117:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1069:
      case 1072:
      case 1168:
      case 1171:
      case 1204:
      case 1207:
      case 1237:
      case 1249:
      case 1252:
      case 1255:
      case 1258:
        return <Snowflake />;

      default:
        break;
    }
  }
  fetchWeather();

  return (
    <div className="weather-container">
      
      <Link to="/other-cities">
      Vedi le altre città</Link>

      <div className="weather-card ">
        <h1 className="weather-title"> Meteo di {city}: </h1>
        <br />
        {weather && getCondition(weather)}
        <br />
        <h1 className="weather-title">
          {" "}
          temperatura {city}: {temp && temp}°
        </h1>
        <br />
        <div className="weather-details">
          <h3 className="weather-data"> umidità: {humidity && humidity}%</h3>
          <h3 className="weather-data"> vento: {wind && wind}km/h</h3>
          <h3 className="weather-data"> indice UV: {UV && UV}</h3>
          <h3 className="weather-data"> Qualità Aria: {aqi && getAQI(aqi)}</h3>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
