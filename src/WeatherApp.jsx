import { useState } from 'react'
import InfoBox from './InfoBox'
import SearchBox from './SearchBox'
export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo]=useState(
        { city:"Mumbai",
            temp:30.51,
            tempMin:30.51,
            tempMax:30.51,
            humidity:54,
            feelsLike:32.57,
            weather:"clear sky "
        }
    )
    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }
    return(
        <div style={{textAlign:"center"}}>
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}