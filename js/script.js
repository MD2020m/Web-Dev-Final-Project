// Load forcast data and add to weather.html

// Declare and assign constants for National Weather Service API call
const ic_lat = 39.773;
const ic_long = -90.229;
const weatherURL = `https://api.weather.gov/points/${ic_lat},${ic_long}`

// Declare and assign url constant for worldtimeapi
const worldTimeURL = "https://worldtimeapi.org/api/timezone/America/Chicago";

// async function to fetch data from National Weather Service API
async function fetchForecast() {
    // Call National Weather Service API
    const response = await fetch(weatherURL);
    const endpoints = await response.json();
    // Navigate to weatherweatherURL for desired endpoint and request from that endpoint
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

    forecastOutput.innerHTML = '<ul class="article-content">';
    for (let i = 0; i < forecastData.names.length; i++) {
        forecastOutput.innerHTML += `<li class="fw-bold">${forecastData.names[i]}</li><p>${forecastData.forecast[i]}</p>`
    }
    forecastOutput.innerHTML += "</ul>"
}

// Async function to fetch current time for US/Chicago timezone 
// from world time API
async function fetchTime() {
    const response = await fetch(worldTimeURL);
    const timeData = await response.json();

    // Regex to extract time from datetime string
    const regex = /([0,1,2,3,4,5,6,7,8,9][0,2,3,4,5,6,7,8,9]:[0,1,2,3,4,5,6,7,8,9][0,1,2,3,4,5,6,7,8,9]:[0,1,2,3,4,5,6,7,8,9][0,1,2,3,4,5,6,7,8,9])/;
    

    time = {
        "day": timeData.day_of_week,
        "time": timeData.datetime.substring(11,16)//.match(regex)
    };

    return time;
}

// Async function to display time and information on dining.html
async function displayTime() {    
    const timeOutput = document.getElementById("dining-time-output");
    const timeData = await fetchTime();

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = weekdays[timeData.day];

    console.log(timeData);

    timeOutput.innerHTML = "";
    timeOutput.innerHTML += `<p class="article-content" id="dining-time-text">${day}, ${timeData.time}</p>`;
}


// Add event listener to header and footer button containers 
// to change color on mouseover and refert on mouseout
const header_footer_links = document.querySelectorAll(".header-link");
header_footer_links.forEach(function(link) {
    link.addEventListener("mouseover", function() {
        link.style.backgroundColor = "rgb(200, 200, 200)";
    });
    link.addEventListener("mouseout", function() {
        link.style.backgroundColor = "rgb(171, 171, 171)";
    });
})

// Add event listeners on index.html resource buttons to 
// change color on mouseover and revert on mouseout
const indRsrcBtns = document.querySelectorAll(".index-nav-btn");
indRsrcBtns.forEach(function(button) {
    button.addEventListener("mouseover", function() {
        button.style.backgroundColor = "rgb(200, 200, 200)";
    });
    button.addEventListener("mouseout", function() {
        button.style.backgroundColor = "white";
    });
})

// Call displayForecast() to fetch and display forecast information on site loading
displayForecast();

displayTime();