import {EVENTTYPES} from "../const.js";
import {EVENTCITIES} from "../const.js";
import {EVENTOFFERS} from "../const.js";
import {EVENTDESCRIPTION} from "../const.js";
import {getRandomInteger} from "../utils/common.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateEventType = () => {
  const randomIndex = getRandomInteger(0, EVENTTYPES.length - 1);
  const randomType = EVENTTYPES[randomIndex].name + EVENTTYPES[randomIndex].placeholder;

  return randomType;
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, EVENTCITIES.length - 1);

  return EVENTCITIES[randomIndex];
};

const generateEventOffers = () => {
  const randomIndex = getRandomInteger(0, 2);
  let randomOffers = [];
  for (let i = 0; i < randomIndex; i++) {
    randomOffers.push(EVENTOFFERS[i]);
  }
  return randomOffers;
};

const generateEventOffersPrice = (offers) => {
  let offersPrice = 0;
  for (let i = 0; i < offers.length; i++) {
    offersPrice += offers[i].price;
  }
  return offersPrice;
};

const generateEventDescriptions = () => {
  const randomIndex = getRandomInteger(0, EVENTDESCRIPTION.length - 1);

  return EVENTDESCRIPTION[randomIndex];
};

const generateEventPhotos = () => {
  let eventDestinationPhotos = [];

  for (let i = 0; i < getRandomInteger(1, 4); i++) {
    let photo = `http://picsum.photos/248/152?r=${Math.random()}`;
    eventDestinationPhotos.push(photo);
  }

  return eventDestinationPhotos;
};

const generateStartDate = () => {
  const randomStartDate = new Date(2020, getRandomInteger(1, 11), getRandomInteger(1, 23), getRandomInteger(0, 23), getRandomInteger(0, 59));
  return randomStartDate;
};

const generateEndDate = (startDate) => {
  const randomEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + getRandomInteger(3, 5), getRandomInteger(0, 23), getRandomInteger(0, 59));
  return randomEndDate;
};

const generateTime = (date) => {
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (hours.length < 2) {
    hours = `0` + hours;
  }
  if (minutes.length < 2) {
    minutes = `0` + minutes;
  }

  return [hours, minutes].join(`:`);
};

const generateDuration = (startDate, endDate) => {
  let startHours = startDate.getHours();
  let startMinutes = startDate.getMinutes();
  let endHours = endDate.getHours();
  let endMinutes = endDate.getMinutes();
  if (startHours > endHours) {
    endHours += 24;
  }

  if (startMinutes > endMinutes) {
    endMinutes += 60;
  }

  let durationHours = endHours - startHours;
  let durationMinutes = endMinutes - startMinutes;

  let duration = ``;

  if (durationHours === 0) {
    duration = `${durationMinutes}M`;
  } else if (durationMinutes === 0) {
    duration = `${durationHours}H`;
  } else {
    duration = `${durationHours}H ${durationMinutes}M`;
  }
  return duration;
};

export const generateEvent = () => {
  const startDate = generateStartDate();
  const endDate = generateEndDate(startDate);
  const startTime = generateTime(startDate);
  const endTime = generateTime(endDate);
  const duration = generateDuration(startDate, endDate);
  const offers = generateEventOffers();
  const offersPrice = generateEventOffersPrice(offers);

  return {
    id: generateId(),
    type: generateEventType(),
    city: generateCity(),
    startDate, // не понимаю насколько это нужно в рамках моков
    endDate, // не понимаю насколько это нужно в рамках моков
    startTime,
    endTime,
    duration,
    price: getRandomInteger(20, 200),
    offers,
    offersPrice,
    destination: {
      description: generateEventDescriptions(),
      photos: generateEventPhotos(),
    },
  };
};
