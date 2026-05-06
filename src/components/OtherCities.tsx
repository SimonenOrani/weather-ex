import { Link } from "react-router-dom";
import CityWeatherCard from "./CityWeatherCard";

interface OtherCitiesProps {
  listaCitta: string[];
}

const OtherCities = ({ listaCitta }: OtherCitiesProps) => {
  return (
    <div className="weather-container">
      <Link to="/" style={{ marginBottom: "20px", display: "inline-block" }}>
        Torna alla Home
      </Link>
      <h1>Meteo Altre Città</h1>
      
      {/* Usiamo la classe cities-grid per il layout a 2 */}
      <div className="cities-grid"> 
        {listaCitta.map((citta) => (
          <CityWeatherCard key={citta} nomeCitta={citta} />
        ))}
      </div>
    </div>
  );
};

export default OtherCities;