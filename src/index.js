import { fetchData, changeUnit } from './modules/logic';

const locationInput = document.getElementById('location');
locationInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (e.target.value !== '') {
      fetchData(e.target.value);
    }
    locationInput.value = '';
  }
});

const unitButton = document.getElementById('temp-display');
unitButton.addEventListener('click', changeUnit);

const standardLocation = 'Netherlands';
fetchData(standardLocation);
