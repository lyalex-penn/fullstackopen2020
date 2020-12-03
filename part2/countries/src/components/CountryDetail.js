import React, {useEffect, useState} from 'react';
import axios from "axios";

const CountryDetail = ({country}) => {

  const apiKey = process.env.REACT_APP_API_KEY
  const request = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.name}`

  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
    .get(request)
    .then(response => {
      console.log('weather response returned for', country.name, response.data)
      setWeather(response.data.current)
    })
  }, [])

  let weatherIcon
  if (weather.weather_icons !== undefined) {
    weatherIcon = <img src={weather.weather_icons[0]}
                       alt='icon of current weather of {country.name}'/>
  }

  return (
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => (
              <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag}
             alt='flag of {country.name}'
             height='15%'
             width='15%'/>
        <h2>Weather in {country.name}</h2>
        <div><b>temperature: </b>{weather.temperature} Celsius</div>
        <div>{weatherIcon}</div>
        <div><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</div>
      </div>
  )
}

export default CountryDetail;