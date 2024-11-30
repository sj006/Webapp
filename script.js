// const city = 'Kolkata'; 
// const lat = 22.5726; // Latitude 
// const lon = 88.3639; // Longitude

async function fetchWeather() {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lon = parseFloat(document.getElementById('longitude').value);

    if(!lat || !lon) {
        alert("Provide a valid Latitude and Longitude");
        return;
    };
    
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await response.json();
    updateWeather(data);
}

function updateWeather(data) {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lon = parseFloat(document.getElementById('longitude').value);
    const temp = document.getElementById('temp');
    const desc = document.getElementById('desc');
    const icon = document.getElementById('icon');
    const cityElement = document.getElementById('city');

    temp.textContent = Math.round(data.current_weather.temperature);
    desc.textContent = getWeatherDescription(data.current_weather.weathercode); 
    icon.src = getWeatherIcon(data.current_weather.weathercode);
    cityElement.textContent = "Latitude:"+lat+" Longitude:"+lon;
}

function getWeatherDescription(code) {
    const descriptionMap = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Drizzle: Light',
        53: 'Drizzle: Moderate',
        55: 'Drizzle: Dense intensity',
        56: 'Freezing Drizzle: Light',
        57: 'Freezing Drizzle: Dense intensity',
        61: 'Rain: Slight',
        63: 'Rain: Moderate',
        65: 'Rain: Heavy intensity',
        66: 'Freezing Rain: Light',
        67: 'Freezing Rain: Heavy intensity',
        71: 'Snow fall: Slight',
        73: 'Snow fall: Moderate',
        75: 'Snow fall: Heavy intensity',
        77: 'Snow grains',
        80: 'Rain showers: Slight',
        81: 'Rain showers: Moderate',
        82: 'Rain showers: Violent',
        85: 'Snow showers: Slight',
        86: 'Snow showers: Heavy',
        95: 'Thunderstorm: Slight or moderate',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    return descriptionMap[code] || 'Unknown weather condition';
}

function getWeatherIcon(code) {
   
    const iconMap = {
        0: 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png', // Clear sky
        1: 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png', // Mainly clear
        2: 'https://cdn-icons-png.flaticon.com/512/7865/7865939.png',
        3: 'https://cdn-icons-png.flaticon.com/512/7865/7865939.png',
        63: 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png', //rainy
        65: 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png',
        95: 'https://cdn-icons-png.flaticon.com/256/4724/4724098.png',
        96: 'https://cdn-icons-png.flaticon.com/256/4724/4724098.png',
        99: 'https://cdn-icons-png.flaticon.com/256/4724/4724098.png',
       
    };
    return iconMap[code] || 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png'; // Default icon
}

document.getElementById('get-weather').addEventListener('click', fetchWeather);
