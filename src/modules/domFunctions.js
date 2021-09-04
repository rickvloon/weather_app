// eslint-disable-next-line import/no-cycle
import { formatDate, getTime } from './logic';

//  Dom functions
const DOM = (() => {
  const getUnit = () => {
    const tempDisplay = document.getElementById('temp-display');
    const tempUnit = tempDisplay.getAttribute('value');
    return tempUnit;
  };

  const mainWeatherDisplay = (weatherData) => {
    // Name change
    const mainWeatherLocation = document.getElementById('main-weather-location');
    mainWeatherLocation.textContent = weatherData.name;

    const mainWeatherTemp = document.getElementById('main-weather-temp');
    let symbol = '';
    if (getUnit() === 'metric') {
      symbol = '°C';
    } else {
      symbol = '°F';
    }
    mainWeatherTemp.textContent = `${Math.round(weatherData.main.temp * 10) / 10} ${symbol}`;

    const mainWeatherCondition = document.getElementById('main-weather-condition');
    mainWeatherCondition.textContent = weatherData.weather[0].description;
    mainWeatherCondition.style.textTransform = 'capitalize';

    const weatherImage = document.getElementById('weather-image');
    weatherImage.src = `img/${weatherData.weather[0].icon}.png`;

    const mainWeatherDate = document.getElementById('main-weather-date');
    mainWeatherDate.textContent = formatDate(weatherData.timezone);

    const mainWeatherTime = document.getElementById('main-weather-time');
    mainWeatherTime.textContent = getTime(weatherData.timezone);
  };

  const sideWeatherDisplay = (weatherData) => {
    let symbol = '';
    let unit = '';
    if (getUnit() === 'metric') {
      symbol = '°C';
      unit = 'km/h';
    } else {
      symbol = '°F';
      unit = 'm/h';
    }
    const feelTemp = document.getElementById('feeltemp-degree');
    feelTemp.textContent = `${weatherData.main.feels_like} ${symbol}`;

    const humidity = document.getElementById('humidity-perc');
    humidity.textContent = `${weatherData.main.humidity} %`;

    const maxTemp = document.getElementById('max-temp');
    maxTemp.textContent = `${weatherData.main.temp_max} ${symbol}`;

    const windSpeed = document.getElementById('wind-speed');
    windSpeed.textContent = `${weatherData.wind.speed} ${unit}`;
  };

  return {
    mainWeatherDisplay,
    getUnit,
    sideWeatherDisplay,
  };
})();

// eslint-disable-next-line import/prefer-default-export
export { DOM };
