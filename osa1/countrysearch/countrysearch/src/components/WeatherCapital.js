import React, { useState } from 'react'



const WeatherCapital = ({weather}) => {

        return (
        <>
        	<h2>Weather in {weather.name} </h2>
        	<div>
        	</div>
        	<img style={{width: 100, height: 100}} src ={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}/>
        	<div>
        		wind : {weather.wind.speed} mph 
        	</div>
        </>
        )
}

export default WeatherCapital;
