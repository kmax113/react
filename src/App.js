import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '458234853189f7fafa9e93154e788b07'; 

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    setWeather(null);

    if (!city) {
      setError('Введіть назву міста');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Місто не знайдено');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Погода</h1>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Введіть місто"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Показати погоду</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Відчувається як: {weather.main.feels_like}°C</p>
          <p>Опис: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
