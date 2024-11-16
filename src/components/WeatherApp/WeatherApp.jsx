import React, { useEffect ,  useState , useRef } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import wind_icon from '../Assets/wind.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import humidity_icon from '../Assets/humidity.png'
var apikey = "0c91e1e777c6d9282dac3c3251a7218f";

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon

  }
  const search = async (city) => {
    if(city === "")
    {
      alert("Please give a good name");
    }
    else{
    try{
      var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok)
      {
        alert("Give a correct name");
        return ;
      }  

      console.dir(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    }
    
    catch(error){

    }
  }
  }
  useEffect(()=>{
    search("New Delhi");
  },[])
  return (
    <div className = "container">
        <div className = "top-bar">
            <input ref = {inputRef}type = "text" className="cityInput" placeholder = 'search'/>
            <div className = "search-icon" onClick={()=>{search(inputRef.current.value)
             inputRef.current.value=""; 
            }}>
                <img src={search_icon} alt=""/>
            </div>
              
        </div>
        <div className="weather-image">
          <img src={weatherData.icon} alt=""/>
        </div>
        <div className="weather-temp">
          {weatherData.temperature}°c
        </div>
        <div className="weather-location">
          {weatherData.location}
        </div>
        <div className = "data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity=percent">{weatherData.humidity}%</div>
              <div className="text">humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity=percent">{weatherData.windspeed}km/hr</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>

    </div>
  )
}
export default WeatherApp;
