import React, {useEffect , useState} from "react";
import "./weather.css";
import Sun from "./assets/sun.png";
import {FaTemperatureHigh} from 'react-icons/fa';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiWind } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import {BsFillSunFill } from 'react-icons/bs';

const WeatherApp = () => {

  const [weatherData , setWeatherData] = useState({});
  const [city , setCity] = useState('London');
  const [findCity , setFindCity] = useState({});
  const [searchCity , setSearchCity] = useState("");

  // geoLocation 

  useEffect( () => {

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position){
            // console.log(position);
            setFindCity(position);
            setCity("");

          },

          function (error){
            setSearchCity(city)
          }

        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
    
    getLocation();
    
 

  }, []);

  useEffect( () => {
    let searchQuery = 
    findCity && findCity.coords 
    ? `lat=${findCity.coords.latitude}&lon=${findCity.coords.longitude}` 
    : `q=${searchCity ? searchCity : city}`;
  
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?${searchQuery}&appid=8339e1e8e05bdd978bd819f34db35976&units=metric`
      )
    .then((res) => res.json())
    .then((result) => {
       setWeatherData(result)
    })
    .catch((err) => {
       console.log("Error" ,err)
    });
     
  }, [searchCity , findCity]);




  // search btn
  const searchBtnn = (e) => {
    setSearchCity(city);
    setFindCity({});
  };

  
    return(
    <>
      
       
    <div className="mainContainer">
            
      <div className="topContainer">

        <div className="icon">
            <h1><GiHamburgerMenu /></h1>
        </div>

        <div className="searchBtn">
            <input 
            type="text" 
            placeholder="Search any city..." 
            value={city} 
            onChange={ (e) => setCity(e.target.value)}

            />
            <button onClick={searchBtnn}> <BsSearch /> </button>
         </div>

        <div className="apiData zoomIn">
          <h1 className="head">{weatherData && weatherData.name}</h1>
          <br />

         <div className="mainMain">
         <h1 className="temp">{weatherData && weatherData.main && weatherData.main.temp}<sup>o</sup>C</h1>
          <h3 className="main">
          {weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main}</h3>
         </div>
          <h4 className="feellike">Feels Like&nbsp;&nbsp;{weatherData && weatherData.main && weatherData.main.feels_like}<sup>o</sup>c</h4>
        </div>
      </div>



      <div className="mainmiddleContainer">

      <div className="middleContainer"> 
      <div className="first">
         <h4>Saturday</h4>
         <h4>Sunday</h4>
         <h4>Monday</h4>
         <h4>Tuesday</h4>
         <h4>Wednesday</h4>
         <h4>Thursday</h4>
         <h4>Friday</h4>
         <h4>Saturday</h4>
        </div>

        <div className="second">
        <h4><img src={Sun} alt="icon" width="50px" height="23px" /></h4>
        <h4><img src={Sun} alt="icon" width="50px" height="23px" /></h4>
        <h4><img src={Sun} alt="icon" width="50px" height="23px" /></h4>
        <h4><img src={Sun} alt="icon" width="50px" height="23px" /></h4>
        <h4><img src={Sun} alt="icon" width="50px" height="23px" /></h4>
        <h4><img src={Sun} alt="icon" width="50px" height="23px" /></h4>
        </div>

        <div className="third">
         <h4>16<sup>o</sup>&nbsp;&nbsp; 30<sup>o</sup></h4>
         <h4>15<sup>o</sup>&nbsp;&nbsp; 31<sup>o</sup></h4>
         <h4>18<sup>o</sup>&nbsp;&nbsp; 30<sup>o</sup></h4>
         <h4>19<sup>o</sup>&nbsp;&nbsp; 32<sup>o</sup></h4>
         <h4>17<sup>o</sup>&nbsp;&nbsp; 30<sup>o</sup></h4>
         <h4>16<sup>o</sup>&nbsp;&nbsp; 31<sup>o</sup></h4>
         <h4>16<sup>o</sup>&nbsp;&nbsp; 32<sup>o</sup></h4>
         <h4>19<sup>o</sup>&nbsp;&nbsp; 33<sup>o</sup></h4>
        </div>
      </div>
       

       <br />

        <div className="detail">
           <div className="d1">
             <h1><FaTemperatureHigh /></h1>
           </div>
           <div className="d1">
             <h1><MdOutlineWaterDrop /></h1>
           </div>
           <div className="d1">
             <h1><BiWind /></h1>
           </div>
         </div>
         <div className="detailContent">
           <div className="dc1">
             <h1>{weatherData && weatherData.main && weatherData.main.pressure}<sup>o</sup></h1>
           </div>
           <div className="dc1">
           <h1>{weatherData && weatherData.main && weatherData.main.humidity}%</h1>
           </div>
           <div className="dc1">
           <h1>{weatherData?.weather && weatherData?.weather[0]?.main} </h1>
           </div>
         </div>

        
      </div>

      

      <div className="bottomContainer">
           <h2><BsFillSunFill />&nbsp;&nbsp;AccuWeather</h2>
      </div>


    </div>
   
    </>

    )
    
};

export default WeatherApp;

