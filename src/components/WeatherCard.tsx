import { CloudRain, CloudSun, Cloudy, Snowflake, Sun, Wind, Droplets, Zap, Activity } from "lucide-react";

interface WeatherProps {
  city: string;
  temp: number;
  humidity: number;
  wind: number;
  uv: number;
  aqi: number;
  conditionCode: number;
}

export const WeatherCard = ({
  city,
  temp,
  humidity,
  wind,
  uv,
  aqi,
  conditionCode,
}: WeatherProps) => {
  
  // Funzione per il colore dinamico della Qualità dell'Aria (AQI)
  const getAQIConfig = (val: number) => {
    const configs: Record<number, { label: string; color: string }> = {
      1: { label: "Ottima", color: "#4ade80" }, // Verde neon
      2: { label: "Buona", color: "#84cc16" },
      3: { label: "Moderata", color: "#fbbf24" }, // Giallo
      4: { label: "Malsana", color: "#f97316" }, // Arancio
      5: { label: "Pessima", color: "#ef4444" }, // Rosso
      6: { label: "Pericolosa", color: "#7f1d1d" },
    };
    return configs[val] || { label: "N/A", color: "#94a3b8" };
  };

  // Funzione per l'icona e il colore primario in base al meteo
  const getWeatherTheme = (code: number) => {
    if (code === 1000) return { icon: <Sun size={32} />, color: "#fbbf24" };
    if (code === 1003) return { icon: <CloudSun size={32} />, color: "#fcd34d" };
    if ([1006, 1009].includes(code)) return { icon: <Cloudy size={32} />, color: "#94a3b8" };
    if (code >= 1063 && code <= 1246) return { icon: <CloudRain size={32} />, color: "#60a5fa" };
    return { icon: <Snowflake size={32} />, color: "#99f6e4" };
  };

  const theme = getWeatherTheme(conditionCode);
  const aqiInfo = getAQIConfig(aqi);

  return (
    <div className="weather-card-modern">
      <div className="top-section">
        <div>
          <h2>{city}</h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Oggi</span>
        </div>
        <div style={{ color: theme.color }}>
          {theme.icon}
        </div>
      </div>

      <div className="temp-modern">{Math.round(temp)}°</div>

      <div className="grid-modern">
        <div className="glass-box">
          <span><Droplets size={12} style={{marginRight: 4}}/> Umidità</span>
          <strong>{humidity}%</strong>
        </div>

        <div className="glass-box">
          <span><Wind size={12} style={{marginRight: 4}}/> Vento</span>
          <strong>{wind} <small style={{fontWeight: 400, opacity: 0.6}}>km/h</small></strong>
        </div>

        <div className="glass-box">
          <span><Zap size={12} style={{marginRight: 4}}/> UV Index</span>
          <strong style={{ color: uv > 5 ? '#f87171' : '#f1f5f9' }}>{uv}</strong>
        </div>

        <div className="glass-box">
          <span><Activity size={12} style={{marginRight: 4}}/> Aria</span>
          <strong style={{ color: aqiInfo.color }}>{aqiInfo.label}</strong>
        </div>
      </div>
    </div>
  );
};