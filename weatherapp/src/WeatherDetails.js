
import React from 'react';


export default function WeatherDetails(props) {

    const { city, state, degrees, description, icon } = props.weatherData;
    
    return (
        <div className="weatherDiv" >
            <h2>{city}, {state} Weather </h2>
            <div>As of {new Date().toLocaleTimeString()}</div>
            <div style={{fontSize: '4em'}}>{degrees}</div>
            <img src={icon} alt="pic unavailable"></img>
            <h3>{description}</h3>
        </div>
    )
}
