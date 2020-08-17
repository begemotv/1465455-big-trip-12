import {EVENTTYPES} from "../const.js";
import {EVENTCITIES} from "../const.js";
import {EVENTOFFERS} from "../const.js";
import {EVENTDESCRIPTION} from "../const.js";
import {getRandomInteger} from "../utils.js";

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
  const randomIndex = getRandomInteger(1, 3);
  let randomOffers = [];
  for (let i = 0; i < randomIndex; i++) {
    randomOffers.push(EVENTOFFERS[i]);
  }

  return randomOffers;
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
  const randomStartDate = new Date(2020, getRandomInteger(1, 11), getRandomInteger(1, 23), 10, 45);
  return randomStartDate;
};

const generateEndDate = (startDate) => {
  const randomEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + getRandomInteger(3, 5), getRandomInteger(0, 20), 10);
  return randomEndDate;
};

const generateStartTime = (startDate) => {
  return startDate.toLocaleTimeString().slice(0, -6);
};
const generateEndTime = (endDate) => {
  return endDate.toLocaleTimeString().slice(0, -6);
};

export const generateEvent = () => {
  const startDate = generateStartDate();
  const endDate = generateEndDate(startDate);
  const startTime = generateStartTime(startDate);
  const endTime = generateEndTime(endDate);

  return {
    type: generateEventType(),
    city: generateCity(),
    startDate,
    endDate,
    startTime, // пока без 0, если время < 10:00. добавлю проверку
    endTime,
    // duration, WIP
    price: getRandomInteger(20, 200),
    offers: generateEventOffers(),
    destination: {
      description: generateEventDescriptions(),
      photos: generateEventPhotos(),
    },
  };
};
