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
    return {geoData,forecastData};
}