import React, { useEffect, useState } from 'react';
import './App.css';
import Error from './Error';
import WeatherDetails from './WeatherDetails';
import RecentSearch from './RecentSearch';

export default function App() {

  const [newZip, setNewZip] = useState('');
  useEffect(() => {
    getWeather();
  }, [newZip])

  const [zip, setZip] = useState('');
  const [theWeather, setTheWeather] = useState(null);
  const [error, setError] = useState('');
  const [recents, setRecents] = useState('');

  const setZipCode = e => {
    // check if value is a number
    const re = /^\d$/;
    if (re.test(e.target.value.slice(-1))) {
      setZip(e.target.value)
    }
  }
  // enables backspacing of first number in input
  const checkDelete = e => {
    if (e.key === "Backspace" && zip.length === 1) {
      setZip('')
    }
  }

  const getWeather = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const currentZip = newZip || zip;
    if (currentZip < 5) {
      return
    }
    setError('')
    setTheWeather(null)
    setZip('');
    setNewZip('');
    const apiKey = 'cb7c71219cf09eb0bb414b932669be97';
    const units = 'imperial';

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${currentZip}&units=${units}`)

      if (!res.ok) {
        setError('Something went wrong');
      }
      const weatherData = await res.json();

      if (weatherData.cod === '404') {
        setError(weatherData.message);
        return
      }

      const place = await fetch(`https://api.zippopotam.us/us/${currentZip}`);
      const placeData = await place.json();
      if (recents) {
        const filtered = recents.filter(recent => recent.zip !== currentZip);
        setRecents([...filtered, { zip: currentZip, city: weatherData.name, degrees: `${weatherData.main.temp.toString().split('.')[0]}°` }]);
      } else {
        setRecents([{ zip: currentZip, city: weatherData.name, degrees: `${weatherData.main.temp.toString().split('.')[0]}°` }])
      }
      setTheWeather({
        city: weatherData.name,
        state: placeData.places[0].state,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
        degrees: `${weatherData.main.temp.toString().split('.')[0]}°`,
        description: `${weatherData.weather[0].description}`
      });
    } catch {
      setError('Something went wrong');
    }
  }

  return (
    <div className="App">
      <h1>React Weather App</h1>
      <p className="app-description">This Weather App uses Html, CSS, Javascript and the REACT framework
       with multiple API's to get the data, and has the ability to view recent searches</p>
      <form onSubmit={getWeather}>
        <input
          className="search-input"
          value={zip}
          placeholder="Search Zip Code"
          onChange={setZipCode}
          onKeyDown={checkDelete}
        />
      </form>
      {theWeather && <WeatherDetails weatherData={theWeather} />}
      {error && <Error error={error} setError={setError} />}
      <div className="recentsDiv" >
        {recents && <span style={{ color: '#0926f9', fontSize: '1.5em', display: 'inline-block', marginBottom: '.3em' }}>
          Recent Searches</span>}
        {recents && recents.map((recent) => <RecentSearch key={recent.zip} recentData={recent} setNewZip={setNewZip} />)}
      </div>
    </div>
  );

}

