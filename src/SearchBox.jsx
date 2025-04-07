import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState,useEffect } from 'react';

export default function SearchBox({updateInfo}){
    let [city,setCity]=useState(" ");
    let [error,setError]=useState(false);
    useEffect(() => {
        let timer;
        if (error) {
          timer = setTimeout(() => {
            setError(false);
          }, 2000);
        }
        return () => clearTimeout(timer);
      }, [error]);
    const API_URl="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY="582a5a690a52ae907beb050c5a2317c9";
    let getWeatherInfo=async()=>{
        try{
        let response=await fetch(`${API_URl}?q=${city}&appid=${API_KEY}&units=metric`)
        let jsonResponse=await response.json();
        
        let result={
            city:city,
            temp:jsonResponse.main.temp,
            tempMin:jsonResponse.main.temp_min,
            tempMax:jsonResponse.main.temp_max,
            humidity:jsonResponse.main.humidity,
            feelsLike:jsonResponse.main.feels_like,
            weather:jsonResponse.weather[0].description
        };
        console.log(result);
        return result
    }catch(err){
        throw err;
    }
    };

    let handleChange=(event)=>{
        setCity(event.target.value);
    }
    let handleSubmit=async(e)=>{
        try{
        e.preventDefault();
        console.log(city);
        setCity("");
        let newinfo=await getWeatherInfo();
        updateInfo(newinfo);
        }catch(err){
            setError(true);
        }
     }
    return (
        <div className="SearchBox">
            
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange}required />
            <br></br><br></br>
            <Button variant="contained" type="submit">Search</Button>
            {error && <p style={{color:"red"}}>No Such Place in our API!</p>}
            </form>
        </div>
    )
}