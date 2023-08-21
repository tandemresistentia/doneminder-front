import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const WEATHER_API_KEY = 'befda63e09ad9fcf30dea5f07a31cd0d';
  const IPSTACK_ACCESS_KEY = '3b31e430bdf9e6f679aaa28db9a715e9';

  useEffect(() => {
    const fetchCityName = async () => {
      try {
        const ipResponse = await axios.get(`https://api.ipstack.com/check?access_key=${IPSTACK_ACCESS_KEY}`);
        console.log('IP Response:', ipResponse.data);
  
        const cityName = ipResponse.data.city;
        console.log('Detected City:', cityName);
  
        const weatherResponse = await axios.get(
          `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${cityName}`
        );
        console.log('Weather Response:', weatherResponse.data);
  
        setWeather(weatherResponse.data.current);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchCityName();
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather-container">
      <h2>{weather.location.name}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Weather: {weather.weather_descriptions[0]}</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind Speed: {weather.wind_speed} km/h</p>
    </div>
  );
};

export default Weather;
