import { API_URL_SVG_ICON } from './vars_api.js';
import { cardContainer } from "./vars_dom.js";

export const createTopCardContent = (specificDay) => {

  const divTop = document.createElement('div');
  const pDayTag = document.createElement('p');
  const pWindDirectionTag = document.createElement('p');

  divTop.classList.add('content__top');
  pDayTag.classList.add('content__top--day');
  pDayTag.textContent = specificDay.applicable_date;
  divTop.appendChild(pDayTag);

  const divCompass = document.createElement('div');
  divCompass.classList.add('top__compass');

  const svgCompass = document.createElement('img');
  svgCompass.classList.add('svg--icon');
  svgCompass.src = './img/svg-compass.svg';
  svgCompass.alt = 'SVG compass icon';

  pWindDirectionTag.classList.add('top__compass--text');
  pWindDirectionTag.textContent = specificDay.wind_direction_compass;

  divCompass.appendChild(svgCompass);
  divCompass.appendChild(pWindDirectionTag);

  divTop.appendChild(divCompass);

  return divTop;
};

export const createCenterCardContent = (specificDay) => {

  const divCenter = document.createElement('div');
  const pTypeTag = document.createElement('p');

  divCenter.classList.add('content__center');

  const imgTag = document.createElement('img');
  imgTag.classList.add('content__center--main-icon');
  imgTag.src = `${API_URL_SVG_ICON}/${specificDay.weather_state_abbr}.svg`;
  imgTag.alt = 'SVG weather icon';

  pTypeTag.classList.add('content__center--text');
  pTypeTag.textContent = specificDay.weather_state_name;

  divCenter.appendChild(imgTag);
  divCenter.appendChild(pTypeTag);

  return divCenter;
};

export const createBottomCardContent = (specificDay) => {

  const divBottom = document.createElement('div');

  divBottom.classList.add('content__bottom');

  const divInfo = document.createElement('div');
  const divTemp = document.createElement('div');

  divInfo.classList.add('bottom__info');
  
  const divInfoGroup1 = document.createElement('div');
  const divInfoGroup2 = document.createElement('div');
  const divInfoGroup3 = document.createElement('div');

  divInfoGroup1.classList.add('info__group');
  divInfoGroup2.classList.add('info__group');
  divInfoGroup3.classList.add('info__group');

  // --------- GROUP 1 --------- //
  const windSVG = document.createElement('img');
  windSVG.classList.add('svg--icon');
  windSVG.src = './img/svg-wind.svg';
  windSVG.alt = 'SVG wind speed icon';

  const windSpeedText = document.createElement('p');
  windSpeedText.textContent = `${Math.floor(specificDay.wind_speed)} km/h`;
  windSpeedText.classList.add('info__group--text');

  divInfoGroup1.appendChild(windSVG);
  divInfoGroup1.appendChild(windSpeedText);

  // --------- GROUP 2 --------- //
  const umbrellaSVG = document.createElement('img');
  umbrellaSVG.classList.add('svg--icon');
  umbrellaSVG.src = './img/svg-umbrella.svg';
  umbrellaSVG.alt = 'SVG umbrella icon';

  const predictabilityText = document.createElement('p');
  predictabilityText.textContent = `${specificDay.predictability}%`;
  predictabilityText.classList.add('info__group--text');

  divInfoGroup2.appendChild(umbrellaSVG);
  divInfoGroup2.appendChild(predictabilityText);

  // --------- GROUP 3 --------- //
  const visibilitySVG = document.createElement('img');
  visibilitySVG.classList.add('svg--icon');
  visibilitySVG.src = './img/svg-eye.svg';
  visibilitySVG.alt = 'SVG visibility icon';

  const visibilityText = document.createElement('p');
  visibilityText.textContent = `${Math.floor(specificDay.visibility)}%`;
  visibilityText.classList.add('info__group--text');

  divInfoGroup3.appendChild(visibilitySVG);
  divInfoGroup3.appendChild(visibilityText);

  // --------- APPENDING EVERYTHING TOGETHER --------- //
  divInfo.appendChild(divInfoGroup1);
  divInfo.appendChild(divInfoGroup2);
  divInfo.appendChild(divInfoGroup3);

  divTemp.classList.add('bottom__temp');

  const pTempTag = document.createElement('p');
  pTempTag.textContent = `${Math.floor(specificDay.the_temp)}°`;

  divTemp.appendChild(pTempTag);

  divBottom.appendChild(divInfo);
  divBottom.appendChild(divTemp);

  return divBottom;
};

export const createCard = (specificDays) => {

  const cardContent = document.createElement('div');

  cardContent.classList.add('cards__content');

  // TOP CARD CONTENT
  const topCard = createTopCardContent(specificDays);

  // CENTER CARD CONTENT
  const centerCard = createCenterCardContent(specificDays);

  // BOTTOM CARD CONTENT
  const bottomCard = createBottomCardContent(specificDays);

  cardContent.appendChild(topCard);
  cardContent.appendChild(centerCard);
  cardContent.appendChild(bottomCard);

  cardContainer.appendChild(cardContent);
};