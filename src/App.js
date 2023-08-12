import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import './styles.css'

const Country = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('')
  const handleChange = (event) => {
    const value = event.target.value
    setInputValue(value)
    onSearch(value)
  };
  return (
    <div className='text-center'>
      <div className='text-white'>
        Find countries <br />
      </div>
      <input value={inputValue} onChange={handleChange} className='border border-black text-center' />
    </div>
  )
}

function App() {
  const [countryName, setCountry] = useState('')
  const [commonName, setCommonName] = useState('')
  const [capitalName, setCapitalName] = useState('')
  const [countryArea, setArea] = useState('')
  const [countryLanguages, setLanguages] = useState('')
  const [countryFlag, setFlag] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [weatherImg, setImage] = useState('')
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState('')
  const [weatherInfo, setInfo] = useState('')
  const [hourlyInfo, setHourly] = useState('')
  const [hourlyInfo2, setHourly2] = useState('')
  const [hourlyInfo3, setHourly3] = useState('')
  const [hourlyInfo4, setHourly4] = useState('')
  const [hourlyInfo5, setHourly5] = useState('')
  const [hourlyImg, setHourlyImg] = useState('')
  const [hourlyImg2, setHourlyImg2] = useState('')
  const [hourlyImg3, setHourlyImg3] = useState('')
  const [hourlyImg4, setHourlyImg4] = useState('')
  const [hourlyImg5, setHourlyImg5] = useState('')
  const [hourlyDate, setDate] = useState('')
  const [hourlyDate2, setDate2] = useState('')
  const [hourlyDate3, setDate3] = useState('')
  const [hourlyDate4, setDate4] = useState('')
  const [hourlyDate5, setDate5] = useState('')
  const timePortion = hourlyDate.split(' ')[1];
  const timePortion2 = hourlyDate2.split(' ')[1];
  const timePortion3 = hourlyDate3.split(' ')[1];
  const timePortion4 = hourlyDate4.split(' ')[1];
  const timePortion5 = hourlyDate5.split(' ')[1];
  const [hourlyMainInfo, setMainInfo] = useState('')
  const [hourlyMainInfo2, setMainInfo2] = useState('')
  const [hourlyMainInfo3, setMainInfo3] = useState('')
  const [hourlyMainInfo4, setMainInfo4] = useState('')
  const [hourlyMainInfo5, setMainInfo5] = useState('')

  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const apiKey = process.env.REACT_APP_API_KEY
  const imgSource = `https://openweathermap.org/img/wn/${weatherImg}.png`
  const celcius = temp - 273.15
  const upComing = hourlyInfo - 273.15
  const upComing2 = hourlyInfo2 - 273.15
  const upComing3 = hourlyInfo3 - 273.15
  const upComing4 = hourlyInfo4 - 273.15
  const upComing5 = hourlyInfo5 - 273.15

  const hourlyImgSource = `https://openweathermap.org/img/wn/${hourlyImg}.png`
  const hourlyImgSource2 = `https://openweathermap.org/img/wn/${hourlyImg2}.png`
  const hourlyImgSource3 = `https://openweathermap.org/img/wn/${hourlyImg3}.png`
  const hourlyImgSource4 = `https://openweathermap.org/img/wn/${hourlyImg4}.png`
  const hourlyImgSource5 = `https://openweathermap.org/img/wn/${hourlyImg5}.png`

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const showTime = hours + ':' + minutes;
       

  const MainBg = `text-center items-center min-h-screen bg-grey ${weatherInfo.toLowerCase()}`;
  const handleSearch = (inputValue) => {
    setCountry(inputValue)
  }

  const filterCountries = (searchLetter) => {
    const filtered = allCountries.filter((country) => {
      const countryName = country.name.common.toLowerCase()
      return searchLetter ? countryName.includes(searchLetter) : true
    })
    setFilteredCountries(filtered)
  }

  useEffect(() => {
    if (countryName) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((response) => {
          const commonData = response.data
          const allCommonNames = commonData.map((country) => country)

          setAllCountries(allCommonNames)
          filterCountries(countryName.toLowerCase())

        })
        .catch((error) => {
          console.log(error)
        })
    }

    if (countryName && filteredCountries.length === 1) {
      const lastCountry = filteredCountries[0].name.common

      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${lastCountry}`)
        .then((response) => {
          const countryData = response.data
          const commonName = countryData.name.common
          const capitalName = countryData.capital
          const countryArea = countryData.area 
          const countryLanguages = countryData.languages 
          const countryFlag = countryData.flags

          setCommonName(commonName)
          setCapitalName(capitalName)
          setArea(countryArea)
          setLanguages(countryLanguages)
          setFlag(countryFlag)

          if (countryFlag) {
            axios
              .get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${apiKey}`)
              .then((response) => {
                setWeatherData(response.data)
                setImage(response.data.weather[0].icon)
                setTemp(response.data.main.temp)
                setWind(response.data.wind.speed)
                setInfo(response.data.weather[0].main)
                
                
                
              
              })
              .catch((error) => {
                console.log(error)
              })
              axios
              .get(`https://api.openweathermap.org/data/2.5/forecast?q=${capitalName}&appid=${apiKey}`)
              .then((response) => {
                setHourly(response.data.list[1].main.temp)
                setHourlyImg(response.data.list[1].weather[0].icon)
                setDate(response.data.list[1].dt_txt)
                setMainInfo(response.data.list[1].weather[0].main)
                setHourly2(response.data.list[2].main.temp)
                setHourlyImg2(response.data.list[2].weather[0].icon)
                setDate2(response.data.list[2].dt_txt)
                setMainInfo2(response.data.list[2].weather[0].main)
                setHourly3(response.data.list[3].main.temp)
                setHourlyImg3(response.data.list[3].weather[0].icon)
                setDate3(response.data.list[3].dt_txt)
                setMainInfo3(response.data.list[3].weather[0].main)
                setHourly4(response.data.list[4].main.temp)
                setHourlyImg4(response.data.list[4].weather[0].icon)
                setDate4(response.data.list[4].dt_txt)
                setMainInfo4(response.data.list[4].weather[0].main)
                setHourly5(response.data.list[5].main.temp)
                setHourlyImg5(response.data.list[5].weather[0].icon)
                setDate5(response.data.list[5].dt_txt)
                setMainInfo5(response.data.list[5].weather[0].main)
                
                
                
              })
          }

        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [countryName]);
  return (
    <div className={MainBg}>
      <Country onSearch={handleSearch} className='text-black' />
      <br />
      <div className='text-white'>
      {filteredCountries.length > 10 ? (
        <p class='text-4xl text-blue text-center'>Too many matches.</p>
      ) : (
        filteredCountries.map((country) => (
          <p key={country.name.common} className='text-center'>{country.name.common}</p>
        ))
      )}
    </div>
    <div className='relative bg-black bg-opacity-50 flex justify-center'>
    <div className='justify-center text-white'>
      <div className='sm:flex gap-2 sm:gap-0'>
    {commonName && capitalName && (
      <div className='relative w-full sm:w-1/2 p-4 sm:p-4'>
        <div className='absolute inset-0'></div>
        <div className='z-10 text-center items-center relative'>
          Capital: {capitalName}
          <br />
          Area: {countryArea}
          <br />
          Languages:
          {countryLanguages &&
            Object.values(countryLanguages).map((language) => (
              <p key={language}>{language}</p>
            ))}
          <br />
          <img
            src={countryFlag.svg}
            className='mx-auto'
            style={{ width: '200px', height: 'auto' }}
            alt='Country Flag'
          />
          
        </div>
      </div>
    )}


      {weatherData && (
        <div className='w-full w-screen sm:w-1/2 p-4'>
          <div className='flex items-center justify-center flex-col'>
            {showTime}
            <br />
            Weather in {capitalName}: <br />
            <br />
            {weatherInfo}
            <br />
            {celcius.toFixed(2)}°C <br />
            <div className='flex items-center justify-center'>
              <img
                src={imgSource}
                style={{ width: '100px', height: 'auto' }}
                alt='Country weather'
                className='m-0'
              />
            </div>
            Wind {wind} m/s
            <br />
            
            
          </div>
        </div>
        
      )}
      
    </div>
    {weatherData && (
        <div className='w-full justify-center p-4 sm:flex'>
          <div className='border'>
          {timePortion}
            <br />
            <br />
          {hourlyMainInfo}
          <br />
          {upComing.toFixed(2)}°C
           <div className='flex items-center justify-center'>
           
              <img src={hourlyImgSource}
              style={{ width: '100px', height: 'auto' }}
              alt='Country weather'
              className='m-0'
              />
            </div>
            
            </div>
          
            <div className='border'>
            {timePortion2}
            <br />
            <br />
          {hourlyMainInfo2}
          <br />
          {upComing2.toFixed(2)}°C
           <div className='flex items-center justify-center'>
           
              <img src={hourlyImgSource2}
              style={{ width: '100px', height: 'auto' }}
              alt='Country weather'
              className='m-0'
              />
            </div>
            </div>
            <div className='border'>
            {timePortion3}
            <br />
            <br />
          {hourlyMainInfo3}
          <br />
          {upComing3.toFixed(2)}°C
           <div className='flex items-center justify-center'>
           
              <img src={hourlyImgSource3}
              style={{ width: '100px', height: 'auto' }}
              alt='Country weather'
              className='m-0'
              />
            </div>
            </div>
            <div className='border'>
            {timePortion4}
            <br />
            <br />
          {hourlyMainInfo4}
          <br />
          {upComing4.toFixed(2)}°C
           <div className='flex items-center justify-center'>
           
              <img src={hourlyImgSource4}
              style={{ width: '100px', height: 'auto' }}
              alt='Country weather'
              className='m-0'
              />
            </div>
            </div>
            <div className='border'>
            {timePortion5}
            <br />
            <br />
          {hourlyMainInfo5}
          <br />
          {upComing5.toFixed(2)}°C
           <div className='flex items-center justify-center'>
           
              <img src={hourlyImgSource5}
              style={{ width: '100px', height: 'auto' }}
              alt='Country weather'
              className='m-0'
              />
            </div>
            </div>
      </div>
      )}
  </div>
  </div>
    </div>
    
  );
};

export default App;


