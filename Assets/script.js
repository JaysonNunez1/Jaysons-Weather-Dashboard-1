const apikey = '32bccd202684ad1da1619bdacd8aaf32';
const form = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const citylist = document.getElementById('city-list');
const current = document.getElementById('current');
const fiveDay = document.getElementById('five-day');

async function fetchWeather(city) {
    const geoUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial';
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();
    
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.coord.lat}&lon=${geoData.coord.lon}&appid=${apiKey}&units=imperial';
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json(); 
    return {geoData,forecastData};
}

function updateCurrentWeather(data){
    const {geoData, forecastData} = data;
    current.style.display = 'block';
    document.getElementById('city').textContent = geoData.name;
    document.getElementById('date').textContent = moment().format('MMMM Do YYYY');
    document.getElementById('temp').textContent = `Temperature: ${forecastData.list[0].main.temp}°F`;
    document.getElementById('humidity').textContent = `Humidity: ${forecastData.list[0].main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${forecastData.list[0].wind.speed} MPH`;
}

function updateFiveDayForecast(data) {
    const {forecastData} = data;
    fiveDay.style.display= 'block';
}