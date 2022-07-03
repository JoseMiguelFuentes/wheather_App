import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'



import axios from 'axios'
import Clock from './Component/Clock'



const week = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']



let time = new Date()
let day = time.getDay()


const apiKey = '26d2eaaa3dd1f4f8333af7465ccfa05a'


let icon




function App() {
  const [location, setLocation] = useState({})
  const [weatherData, setWeatherData] = useState({}) //keeping data from api.
  const [tempUnits, setTempUnits] = useState ('metric') //Used to save temperature measurement units.
  const [background, setBackground] = useState ('main-box')//keeping classes to set wallpaper
  const [icon, setIcon] = useState ()//keeping classes to set wallpaper

  const success = (pos)=>{
    let lat = pos.coords.latitude
    let lon = pos.coords.longitude
     setLocation({ lat: lat, lon: lon})
   }
   
   function error(err) {
   console.warn('ERROR(' + err.code + '): ' + err.message);
   }
   var options = {
     enableHighAccuracy: true,
     timeout: 3000,
     maximumAge: 0
   }

  /*  Getting the current position  from de device */
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success, error, options);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&lang=sp&units=${tempUnits}`)
    .then(res =>  setWeatherData(res.data))
  },[])
  useEffect(()=>{
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&lang=sp&units=${tempUnits}`)
    .then(res =>  setWeatherData(res.data))
  },[location])
  useEffect(()=>{
      setIcon(`http://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`)
    
  },[weatherData])


  useEffect( ()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&lang=sp&units=${tempUnits}`)
    .then(res =>  setWeatherData(res.data))
  },[tempUnits] )

  useEffect(()=>{
    let interval = setInterval (updateTime, 1000)
    console.log('Dentro del primer')
  },[])

  console.log(weatherData)

  /***** Change background image class when weatherdata change****/
  useEffect(()=>{
    switch (weatherData.weather?.[0].main) {
      case 'Drizzle':
        setBackground ('main-box drizzle');
        break;
      case 'Thunderstorm':
        setBackground ('main-box thunderstorm');
        break;
      case 'Rain':
        setBackground('main-box rain' );
        break;
      case 'Clouds':
        setBackground('main-box cloudy');
        break;
      case 'Clear':
        setBackground('main-box clear');
        break;
      case 'Snow':
        setBackground('main-box snow');
        break;
      case 'Fog':
        setBackground('main-box fog');
        break;
      case 'Smoke':
        setBackground('main-box smoke');
        break;
      default:
        setBackground('main-box default');
    }
    
    
    
},[weatherData])  
  // useEffect(()=>{
    
  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${tempUnits}`)
  //   .then(res =>  setWeatherData(res.data))
  //   console.log('Segundo Effect')
  // },[tempUnits])

  


  //change temperature measurement units
  const changeTempUnits = () => {
    if(tempUnits === 'imperial'){
      setTempUnits ('metric')
      // axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${tempUnits}`)
      // .then(res =>  setWeatherData(res.data))
      console.log(tempUnits) 
    }else{
      setTempUnits ('imperial')
      // axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${tempUnits}`)
      // .then(res =>  setWeatherData(res.data))
      console.log(tempUnits)
    }
  }

  let seconds
  let minutes
  const updateTime =()=> {
    if(time.getMinutes() < 10){ minutes = `0${time.getMinutes()}`}else{ minutes = `${time.getMinutes()}`}
    if(time.getSeconds() < 10){ seconds = `0${time.getSeconds()}`}else{seconds = `${time.getSeconds()}`}
  }
  updateTime()
 

  return (
    <div className={background} >
      <div className="App">
        <h1 className='title'>Wheather App</h1>
        
        <h4>{week[day]},</h4>
        <h3>{time.getDate()} {months[time.getMonth()]} {time.getFullYear()}</h3>
        <div className="clock">  
        <Clock/>
        </div>
        <h3 style={{fontFamily: 'Orbitron'}}><b>{weatherData.weather?.[0].main}</b></h3>   
        <h2 style={{fontFamily: 'Comic Sans MS'}}>{weatherData.weather?.[0].description}</h2>
        <div className="image__background">
          <img src={icon} alt="icon" />
        </div>
        <p className='location'><i className='bx bxs-map'></i><b> {weatherData?.name}, {weatherData.sys?.country}</b></p>
        <p className="temperature" style={{fontFamily: 'Lato'}}>Temperature:<span style={{fontFamily: 'Orbitron'}}>  {weatherData.main?.temp}  {tempUnits === 'imperial'? '°F'  : '°C'}</span></p>
        <p className="wind__speed" style={{fontFamily: 'Lato'}}>Wind speed:<span style={{fontFamily: 'Orbitron'}}> {weatherData.wind?.speed} {tempUnits === 'imperial'? 'miles/hour':'meter/sec'}</span></p>
        <p style={{fontFamily: 'Lato'}}>Clouds:<span style={{fontFamily: 'Orbitron'}}>   {weatherData.clouds?.all}%</span></p>
        <p style={{fontFamily: 'Lato'}}>Pressure:<span style={{fontFamily: 'Orbitron'}}>  {weatherData.main?.pressure} hPa</span></p>
        <button onClick={changeTempUnits} type="button" className="change-unit">{tempUnits === 'metric' ? 'Fahrenheit' : 'Centigrade'}</button>
      </div>
    </div>
  
  )
}

export default App
