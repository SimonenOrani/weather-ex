import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import OtherCities from "./components/OtherCities";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/other-cities" element={<OtherCities />} />
    </Routes>
  );
};

export default App;
