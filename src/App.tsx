import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import OtherCities from "./components/OtherCities";

const App: React.FC = () => {
  const cittaDaMostrare = ["Bologna", "Roma", "Milano", "Torino", "Firenze", "Venezia"];

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/other-cities" 
        element={<OtherCities listaCitta={cittaDaMostrare} />} 
      />
    </Routes>
  );
};

export default App;