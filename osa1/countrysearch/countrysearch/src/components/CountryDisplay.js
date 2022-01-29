import React, { useState } from 'react'
import WeatherCapital from './WeatherCapital'


const CountryDetail = ({country, weather}) => {
        return (
        <>
          <h1>
             {country.name.common}            
          </h1>
          <div>
            capital {country.capital}            
          </div>
          <div>
            population {country.population}            
          </div>
          <h2>
             languages 
          </h2>

          <ul>
            {Object.entries(country.languages).map(([key, value]) => 
                <li key = {key}>
                     {value}
                </li>)
            }
          </ul> 
          <>
          <img style={{width: 250, height: 175}} className = 'flag' src = {country.flags.png} />
          </>
          <WeatherCapital weather = {weather}/>
        </>
        )
}

const Button = ({handleSelectedClick}) => { 
  return (
      <button onClick={handleSelectedClick}> show </button>
  )
}

const Country = ({country, handleSelectedClick}) => {

  return (
                <div key = {country.ccn3} >
                    <li> 
                        {country.name.common}  
                    <Button handleSelectedClick = {handleSelectedClick}/>
                    </li>
                </div>
          )
}

const CountriesList = ({countries,selectedCountry, handleSelectedClick, weather}) => {
    if (selectedCountry.length !== undefined ){
    return(
      <>
          <ul>
                {countries.map(
                  (country, index) => 
                  <div key= {index}>
                      <Country  country ={country} handleSelectedClick={() => handleSelectedClick(country)}/>
                  </div>

                    )
                }
          </ul>
      </> )
    } 
    return (<CountryDetail country = {selectedCountry} weather ={weather}/>)
  
}

const CountryDisplay = ({countries,selectedCountry, handleSelectedClick, weather}) => {
      if (countries.length === 1)
      {
        return (<CountryDetail country = {countries[0]} weather ={weather}/>)

      } else if (countries.length <= 10 && countries.length > 1) {

        return (
          <CountriesList countries ={countries} selectedCountry = {selectedCountry} handleSelectedClick ={handleSelectedClick} 
          weather = {weather}/>
        )
      } else if (countries.length === 0){
        return (
        <div> No result found. Please try something else </div>
        )
      }
      return ( <div> Too many matches, specify another filter </div>
         )

}


export default CountryDisplay