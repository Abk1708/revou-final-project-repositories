import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faWind, faTint } from '@fortawesome/free-solid-svg-icons';

interface WeatherResponse {
  location: LocationInfo;
  current: CurrentWeatherInfo;
}

interface LocationInfo {
  name: string;
}

interface CurrentWeatherInfo {
  temp_c: number;
  condition: ConditionInfo;
  wind_kph: number;
  wind_dir: string;
  humidity: number;

}

interface ConditionInfo {
  text: string;

}





const WeatherApp = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=jakarta`);
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [API_KEY]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weather) {
    return <div>Error: Unable to fetch weather data</div>;
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-gray-800 text-lg font-semibold mb-2">Weather in {weather.location.name}</h2>
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faSun} className="text-yellow-500 mr-2" />
        <p className="text-gray-600">Temperature: {weather.current.temp_c}°C</p>
      </div>
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faCloud} className="text-gray-500 mr-2" />
        <p className="text-gray-600">Condition: {weather.current.condition.text}</p>
      </div>
      <div className="flex items-center mb-2">
        <FontAwesomeIcon icon={faWind} className="text-blue-500 mr-2" />
        <p className="text-gray-600">Wind: {weather.current.wind_kph} km/h, {weather.current.wind_dir}</p>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faTint} className="text-blue-300 mr-2" />
        <p className="text-gray-600">Humidity: {weather.current.humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherApp;
