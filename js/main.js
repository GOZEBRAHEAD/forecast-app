// ============ IMPORTS ============ //
import { debounce } from './helpers.js';

import { REGEX_FOR_TEXT, REGEX_LATTLONG } from './vars_regex.js';

import { 
  btnSearch, userLocationInput, 
  cardContainer
} from './vars_dom.js';

import {
  addWrongInputEffect, removeWrongInputEffect,
  getForecastFromAPI, removeAllChildNodes, 
  saveWeatherInLocalStorage, getWeatherFromLocalStorage, 
  createCards
} from './func_utils.js';

// ============ EVENTS ============ //
btnSearch.addEventListener('click', debounce(async () => {

  let userInput = userLocationInput.value.trim();

  if (userInput.length === 0) {
    addWrongInputEffect();
    return;
  }

  removeWrongInputEffect();

  try {

    // searchingTypeOnInput = 0 => user didn't wrote a correct city.
    // searchingTypeOnInput = 1 => user is searching with text format.
    // searchingTypeOnInput = 2 => user is searching with latt/long format.
    let searchingTypeOnInput = 1;
    
    if (userInput.match(REGEX_FOR_TEXT) === null) {
      searchingTypeOnInput = (userInput.match(REGEX_LATTLONG) !== null) ? 2 : 0;
    }

    if (searchingTypeOnInput === 0) {
      throw new Error('There was an error while trying to fetch the data.');
    }

    let weather = await getForecastFromAPI(userInput, searchingTypeOnInput);

    saveWeatherInLocalStorage(weather);

    removeAllChildNodes(cardContainer);

    createCards(weather);
  }
  catch (err) {
    addWrongInputEffect();
  }

}, 1500));

window.onload = () => {

  let lastUserWeatherSaved = getWeatherFromLocalStorage();

  if (lastUserWeatherSaved === null) {
    return;
  }

  removeAllChildNodes(cardContainer);

  createCards(lastUserWeatherSaved);
};