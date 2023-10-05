'use client';

import axios from 'axios';
import { Weather } from './Models/Weather';
import { Location } from './Models/Location';
import { useEffect, useState } from 'react';
import Search from './Components/Search';
import { styled } from 'styled-components';
import Icon from './Components/Weather/Icon';
import Temperature from './Components/Weather/Temperature';
import Attributes from './Components/Weather/Attributes';
import Days from './Components/Days';


function WeatherApp() {

  const [weather, setWeather] = useState<Weather | undefined>(undefined)
  const [location, setLocation] = useState<Location | undefined>(undefined)
  const [forecastDays, setForecastDays] = useState<number>(7)
  const [days, setDays] = useState<Array<object>>([])

  const [displayDay, setDisplayDay] = useState<number>(0);

  useEffect(() => {
    if(location) {
      getWeatherData(location?.latitude, location?.longitude)
    }
  }, [location])

  useEffect(() => {
    let daysMap:Array<object> = []
    for(let i = 0; i < forecastDays; i++) {
      let date = new Date();
      daysMap?.push({
        day: i,
        date: new Date(date?.setDate(date?.getDate() + i))
      })
    }
    setDays(daysMap);
  }, [])

  async function getWeatherData(latitude: number | undefined, longitude:number | undefined) {
    let urlParams = [
      'temperature_2m_min',
      'temperature_2m_max',
      'apparent_temperature_min',
      'apparent_temperature_max',
      'weathercode',
      'windspeed_10m_max',
      'windgusts_10m_max',
      'precipitation_probability_mean'
    ]

    await axios.get<Weather>(`https://api.open-meteo.com/v1/forecast?&timezone=GMT&latitude=${latitude}&longitude=${longitude}&forecast_days=${forecastDays}&daily=${urlParams?.join?.(',')}`).then((response) => {
      setWeather(response?.data)
      setDisplayDay(0)
    }).catch((error) => {
    })
  }

  return (
    <StyledContainer>
      <Search location={location} setLocation={setLocation}/>
      {weather && <StyledCityContainer>
        <StyledWeatherContainer>
          <Icon weather={weather} displayDay={displayDay}/>
          <Temperature weather={weather} displayDay={displayDay}/>
        </StyledWeatherContainer>
        <Attributes city={location?.name} country={location?.country} weather={weather} displayDay={displayDay}/>
      </StyledCityContainer>}
      {weather && <Days days={days} setDisplayDay={setDisplayDay} displayDay={displayDay}/>}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom right, blue, lightgreen);
  border-radius: 25px;
  width: 500px;
  padding: 25px;

  @media only screen and (max-width: 500px) {
    width: fit-content
  }
`;

const StyledCityContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  background-color: transparent;
  flex-direction: column;
  margin: 3rem 0em;
`;

const StyledWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export default WeatherApp;
