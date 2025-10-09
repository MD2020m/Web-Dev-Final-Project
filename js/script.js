// Import package to use Open Meteo weather API


import { fetchWeatherApi } from 'openmeteo';

const params = {
    "latitude": 39.7339, // Latitude of IC
    "longitude": -90.229, // Longitude of IC
    "current": ["relative_humidity_2m", 
        "apparent_temperature", 
        "precipitation", 
        "wind_speed_10m",
        "temperature_2m"],
    "timezone": "America/Chicago",
    "forecast_days": 1,
    "wind_speed_unit": "mph",
    "temperature_unit": "farenheit",
    "precipitation_unit": "inch"
};

const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

const response = responses[0];

const current = response.current();

const weatherData = {
    current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        relative_humidity_2m: current.variables(0).value(),
        apparent_temperature: current.variables(1).value()
    }
}

console.log(weatherData)