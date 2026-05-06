import { useState, useEffect } from "react";
import { WeatherCard } from "./WeatherCard";
import { API_KEY, BaseUrl } from "../constants";
import { Link } from "react-router-dom";

const cities = ["Bologna", "Roma", "Milano", "Torino", "Firenze", "Venezia"];

const OtherCities = () => {
  const [weatherData, setWeatherData] = useState<any>({});

  const fetchAllCities = async () => {
    const promises = cities.map(async (city) => {
      const url = `${BaseUrl}/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
      const response = await fetch(url);
      const data = await response.json();
      return { name: city, data: data };
    });

    const results = await Promise.all(promises);

    const newData: any = {};
    results.forEach((res) => {
      newData[res.name] = res.data;
    });

    setWeatherData(newData);
  };

  useEffect(() => {
    fetchAllCities();
  }, []);

  return (
    <div className="page-container">
      <div className="top-bar">
        <h1>Altre città</h1>
        <Link to="/" className="back-btn">
          ⬅ Torna indietro
        </Link>
      </div>

      <div className="grid-container">
        {cities.map((nomeCitta) => {
          const info = weatherData[nomeCitta];

          if (!info)
            return (
              <div key={nomeCitta} className="loading-card">
                Caricamento {nomeCitta}...
              </div>
            );

          return (
            <WeatherCard
              key={nomeCitta}
              city={nomeCitta}
              temp={info.current.temp_c}
              humidity={info.current.humidity}
              wind={info.current.wind_kph}
              uv={info.current.uv}
              aqi={info.current.air_quality["us-epa-index"]}
              conditionCode={info.current.condition.code}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OtherCities;