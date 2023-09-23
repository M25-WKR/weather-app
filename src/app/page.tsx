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

function WeatherApp() {

  const [weather, setWeather] = useState<Weather | undefined>(undefined)
  const [location, setLocation] = useState<Location | undefined>(undefined)
  const [icon, setIcon] = useState<any>(undefined)

  useEffect(() => {
    if(location) {
      getWeatherData(location?.latitude, location?.longitude)
    }
  }, [location])

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

    await axios.get<Weather>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_days=1&daily=${urlParams?.join?.(',')}`).then((response) => {
      setWeather(response?.data)
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <StyledContainer>
      <Search location={location} setLocation={setLocation}/>
      <StyledCityContainer>
        <StyledWeatherContainer>
          <Icon weather={weather}/>
          <Temperature weather={weather}/>
        </StyledWeatherContainer>
        <Attributes city={location?.name} country={location?.country} weather={weather}/>
      </StyledCityContainer>
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
  margin-top: 3rem;
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
