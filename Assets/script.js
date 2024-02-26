const apiKey = '32bccd202684ad1da1619bdacd8aaf32';
const form = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const cityList = document.getElementById('city-list');
const current = document.getElementById('current');
const fiveDay = document.getElementById('five-day');

// Fetch the weather data for a given city
async function fetchWeather(city = getCity()) {
  const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.coord.lat}&lon=${geoData.coord.lon}&appid=${apiKey}&units=imperial`;
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();

  return { geoData, forecastData };
}

// Update the HTML for the current weather section
function updateCurrentWeather(data) {
  const { geoData, forecastData } = data;
  current.style.display = 'block';
  document.getElementById('city').textContent = geoData.name;
  document.getElementById('date').textContent = moment().format('MMMM Do YYYY');
  document.getElementById('temp').textContent = `Temperature: ${forecastData.list[0].main.temp}°F`;
  document.getElementById('humidity').textContent = `Humidity: ${forecastData.list[0].main.humidity}%`;
  document.getElementById('wind').textContent = `Wind Speed: ${forecastData.list[0].wind.speed} MPH`;
}

// Update the HTML for the 5-day forecast section
function updateFiveDayForecast(data) {
    const { forecastData } = data;
    fiveDay.style.display = 'block';
  
    // create the forecast element once, outside the loop
    const forecastElement = document.createElement('div');
    forecastElement.classList.add('card-deck');
  
    for (let i = 1; i < 6; i++) {
      const forecastDay = forecastData.list[i * 8 - 7];
      const cardElement = document.createElement('div');
      cardElement.classList.add('card', 'bg-primary', 'text-white', 'mb-2');
      cardElement.style.width = '18rem';
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const dateElement = document.createElement('h5');
      dateElement.classList.add('card-title');
      dateElement.textContent = moment.unix(forecastDay.dt).format('MMMM Do YYYY');
  
      const iconElement = document.createElement('img');
      iconElement.src = `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png`;
  
      const tempElement = document.createElement('p');
      tempElement.classList.add('card-text');
      tempElement.textContent = `Temperature: ${forecastDay.main.temp}°F`;
  
      const windElement = document.createElement('p');
      windElement.classList.add('card-text');
      windElement.textContent = `Wind Speed: ${forecastDay.wind.speed} MPH`;
  
      const humidityElement = document.createElement('p');
      humidityElement.classList.add('card-text');
      humidityElement.textContent = `Humidity: ${forecastDay.main.humidity}%`;
  
      // append each day's forecast to the forecast element
      cardBody.appendChild(dateElement);
      cardBody.appendChild(iconElement);
      cardBody.appendChild(tempElement);
      cardBody.appendChild(windElement);
      cardBody.appendChild(humidityElement);
      cardElement.appendChild(cardBody);
      forecastElement.appendChild(cardElement);
    }
  
    // append the forecast element to the fiveDay container element
    fiveDay.appendChild(forecastElement);
  }
//Add an event listener to the form that listens for the 'submit' event	
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    storeCity(city);
  
    if (city) {
      try {
        const data = await fetchWeather(city);
        console.log(data);
        
        updateCurrentWeather(data);
        updateFiveDayForecast(data);
        cityInput.value = '';
      } catch (error) {
        console.error(error);
        alert('Error fetching weather data. Please try again.');
      }
    }
    function storeCity(city){
        localStorage.setItem('city', city);
    }
    function getCity() {
        return  localStorage.getItem('city');
    }
  });