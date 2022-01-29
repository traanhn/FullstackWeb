import React, { useState,useEffect } from 'react'
import axios from 'axios'
import SearchBox from './components/SearchBox'
import CountryDisplay from './components/CountryDisplay'



const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesDefault, setCountriesDefault] = useState([]);
  const [selectedCountry, setSelectedCountry] =useState([])
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState('London')
  const api_key = process.env.REACT_APP_API_KEY



  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setCountriesDefault(response.data)
      })
  }, [])


  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])

  
  const handleSearchChange = (event) => {
      setNewSearch(event.target.value)
  }

  const showSearchResult = (event) => {
      event.preventDefault()
      const foundCountries = countriesDefault.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
      setCountries(foundCountries)
      setSelectedCountry(foundCountries)

      foundCountries.length === 1
          ?
      setCapital(foundCountries[0].capital)
          :
      setCapital(capital) 


      setNewSearch('')
  }

  const handleSelectedClick = (e) => {
      setSelectedCountry(e)
      setCapital(e.capital)
    }




    return (
        <div>
        <SearchBox newSearch = {newSearch} handleSearchChange = {handleSearchChange} showSearchResult ={showSearchResult} /> 
        <CountryDisplay countries = {countries} selectedCountry ={selectedCountry} handleSelectedClick ={handleSelectedClick} 
        weather ={weather}/>
        </div>
       )
    }


export default App;
