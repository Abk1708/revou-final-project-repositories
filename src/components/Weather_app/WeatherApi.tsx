import { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=jakarta`);
        const data = await response.json();
        setWeather(data);
        setLoading(false); // Set loading to false after successfully fetching data
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  if (!weather) {
    return <div>Error: Unable to fetch weather data</div>; // Display error message if weather data is not available
  }

  return (
    <div className=" bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-gray-800 text-lg font-semibold mb-2">Weather in {weather.location.name}</h2>
      <p className="text-gray-600">Temperature: {weather.current.temp_c}°C</p>
      {/* Display other weather data here */}
      <p className="text-gray-600">Condition: {weather.current.condition.text}</p>
      <p className="text-gray-600">Wind: {weather.current.wind_kph} km/h, {weather.current.wind_dir}</p>
      <p className="text-gray-600">Humidity: {weather.current.humidity}%</p>
      {/* Add more weather data as needed */}
    </div>
  );
};

export default WeatherApp;
