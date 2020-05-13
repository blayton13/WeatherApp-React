import React, {useState} from 'react';

import Header from './Header';
import Footer from './Footer';
import Tagline from './Tagline';
import axios from 'axios';
import Content from './Content';
import WeatherSearch from './WeatherSearch';
import WeatherData from './WeatherData';
import Error from './Error';
import DateTime from './DateTime';
import Context from '../Context';


const Main = () => {

    const [weather, setWeather] = useState();
    const [city, setCity] = useState();
    const [error, setError] = useState();

    const api_call = async (e) => {
        e.preventDefault();
        const API_KEY = 'a5d3b63004f9a6db06294c8c232f9a77';
        const location = e.target.elements.location.value
        if(!location){
            setWeather(null);
            return setError("Please enter the name of the city.")
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`;
        const request = axios.get(url);
        const response = await request;
        setWeather(response.data.main);
        setCity(response.data.name);
        setError(null);
    }

    return(
        <div className="main">
            <Header/>
            <Content>
                {!weather && <Tagline/>}
                <DateTime/>
                <Context.Provider value={{api_call, weather, city, error}}>
                    <WeatherSearch />
                    { weather && <WeatherData/> }
                    {error && <Error error={error}/>}
                </Context.Provider>
                <Footer/>
            </Content>
            
        </div>
    )
}

export default Main;