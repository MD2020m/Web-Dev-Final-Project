// Load forcast data and add to weather.html

// Declare and assign constants for National Weather Service API call
const ic_lat = 39.773;
const ic_long = -90.229;
const url = `https://api.weather.gov/points/${ic_lat},${ic_long}`

// async function to fetch data from National Weather Service API
async function fetchForecast() {
    // Call National Weather Service API
    const response = await fetch(url);
    const endpoints = await response.json();
    // Navigate to URL for desired endpoint and request from that endpoint
    const forecast_response = await fetch(endpoints.properties.forecast);
    const forecast_data = await forecast_response.json();
    const period_forecasts = await forecast_data.properties.periods;

    // Retrieve data from forecast endpoint response
    let names = [];
    let detailed_forecasts = [];
    period_forecasts.forEach(function(period) {
        names.push(period.name);
        detailed_forecasts.push(period.detailedForecast);
    });

    // Package forecast data as JSON
    const forecast = {
        "names": names,
        "forecast": detailed_forecasts
    };
    return forecast;
}

// Define function to display weather forecast
async function displayForecast() {
    const forecastOutput = document.getElementById("weather-rprt-div");
    const forecastData = await fetchForecast()
    console.log(forecastData);

    forecastOutput.innerHTML = "<ul>";
    for (let i = 0; i < forecastData.names.length; i++) {
        forecastOutput.innerHTML += `<li>${forecastData.names[i]}</li><p>${forecastData.forecast[i]}</p>`
    }
    forecastOutput.innerHTML += "</ul>"
}

displayForecast();