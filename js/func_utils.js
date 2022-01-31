import { API_URL_BASE, API_URL_BY_TEXT, API_URL_BY_COORDS } from './vars_api.js';
import { createCard } from './func_card.js';
import { 
  userLocationInput, inputErrorMessage, 
  MAX_DAYS_WEATHER, LOCAL_STORAGE_NAME
} from './vars_dom.js';

export const getForecastFromAPI = async (locationInput, searchingTypeOnInput) => {

  let response = await fetch(
    `${API_URL_BASE}/${searchingTypeOnInput === 1 ? API_URL_BY_TEXT : API_URL_BY_COORDS}${locationInput}`);

  let locationId = await response.json();
  
  let finalLocation = await fetch(`${API_URL_BASE}/${locationId[0].woeid}`);
  
  let finalResult = await finalLocation.json();

  return finalResult;
};

export const removeAllChildNodes = (parent) => {

  while (parent.firstChild) {
    
    parent.removeChild(parent.firstChild);
  }
}

export function addWrongInputEffect() {
  userLocationInput.classList.add('subtitle__search--input-wrong');
  inputErrorMessage.classList.add('enable');
};

export function removeWrongInputEffect() {
  userLocationInput.classList.remove('subtitle__search--input-wrong');
  inputErrorMessage.classList.remove('enable');
};

export const createCards = (weather) => {

  for (let i = 0; i < MAX_DAYS_WEATHER; i++) {
    createCard(weather.consolidated_weather[i]);
  }
};

export const saveWeatherInLocalStorage = (weather) => localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(weather));

export const getWeatherFromLocalStorage = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));