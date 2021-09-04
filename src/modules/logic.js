// eslint-disable-next-line import/no-cycle
import { DOM } from './domFunctions';

// Function that gets data from API
async function fetchData(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${DOM.getUnit()}&APPID=3e154bc3a93e83e26ed0c94673a17679`, { mode: 'cors' });
    const weatherData = await response.json();
    if (weatherData.message) {
      alert(`Error: ${weatherData.message}`);
    } else {
      console.log(weatherData);
      DOM.mainWeatherDisplay(weatherData);
      DOM.sideWeatherDisplay(weatherData);
      // eslint-disable-next-line no-undef
      initMap(weatherData);
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
}

const getLocationTime = (timezone) => {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const UTC = localTime + localOffset;
  const time = UTC + (timezone * 1000);

  const nd = new Date(time);
  return nd;
};

const formatDate = (timezone) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const d = getLocationTime(timezone);
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const result = `${day}, ${date}th ${month}' ${year}`;

  return result;
};

const changeUnit = () => {
  const tempDisplay = document.getElementById('temp-display');
  if (tempDisplay.getAttribute('value') === 'metric') {
    tempDisplay.setAttribute('value', 'imperial');
  } else {
    tempDisplay.setAttribute('value', 'metric');
  }
  const mainWeatherLocation = document.getElementById('main-weather-location');
  const location = mainWeatherLocation.textContent;
  fetchData(location);
};

const getTime = (timezone) => {
  const nd = getLocationTime(timezone);
  return nd.toLocaleTimeString();
};

export {
  fetchData, formatDate, getTime, changeUnit,
};
