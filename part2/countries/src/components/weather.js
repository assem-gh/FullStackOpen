import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
console.log('api', api_key)

const Weather = ({ capital }) => {
    const [weather, setweather] = useState({})
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query= ${capital}`)
            .then(response => {
                const newWeather = response.data.current
                setweather(newWeather)
            })

    }, [capital])
    console.log(weather)


    return (

        <>
            <h2>Weather in {capital}</h2>
            <p><b>temperature:</b> {weather.temperature} Celcius</p>
            <img src={weather.weather_icons} alt='weather_icon' />
            <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
            <div></div>
        </>
    )
}
export default Weather