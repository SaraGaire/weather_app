const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorDiv = document.getElementById('error');

const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

searchBtn.addEventListener('click', fetchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/weather?city=${city}`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
            hideError();
        } else {
            showError(data.error || 'Failed to fetch weather data');
        }
    } catch (error) {
        showError('Failed to connect to weather service');
    }
}

function displayWeather(data) {
    cityName.textContent = data.city;
    temperature.textContent = `${Math.round(data.temperature)}°C`;
    description.textContent = data.description;
    humidity.textContent = `${data.humidity}%`;
    windSpeed.textContent = `${data.wind_speed} m/s`;
    
    weatherInfo.classList.remove('hidden');
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}

function hideError() {
    errorDiv.classList.add('hidden');
}