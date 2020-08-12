import {eventTypes} from "../const.js";
import {eventCities} from "../const.js";
import {eventOffers} from "../const.js";
import {eventDestinationDescriptions} from "../const.js";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateEventType = () => {
  const randomIndex = getRandomInteger(0, eventTypes.length - 1);

  return eventTypes[randomIndex];
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, eventCities.length - 1);

  return eventCities[randomIndex];
};

const generateEventStartDate = () => {
  const eventStartDate = new Date().toLocaleString(`en-US`, {hour: `2-digit`, minute:`2-digit`};
  console.log(eventStartDate);

  return eventStartDate;
};

const generateEventEndDate = () => {
  const eventEndDate = new Date();

  return eventEndDate;
};

const generateEventOffers = () => {
  const randomIndex = getRandomInteger(1, eventOffers.length - 1);
  let randomOffers = [];
  for (let i = 0; i < randomIndex; i++) {
    randomOffers.push(eventOffers[i].name);
  }

  return randomOffers;
};

const generateEventDescriptions = () => {
  const randomIndex = getRandomInteger(0, eventDestinationDescriptions.length - 1);

  return eventDestinationDescriptions[randomIndex];
};

const generateEventPhotos = () => {
  let eventDestinationPhotos = [];

  for (let i = 0; i < getRandomInteger(1, 4); i++) {
    let photo = `http://picsum.photos/248/152?r=${Math.random()}`;
    eventDestinationPhotos.push(photo);
  }
  return eventDestinationPhotos;
}

export const generateEvent = () => {
  return {
    type: generateEventType(),
    city: generateCity(),
    // eventStartDate:
    // eventEndDate:
    price: getRandomInteger(20, 200),
    offers: generateEventOffers(),
    destination: {
      description: generateEventDescriptions(),
      photos: generateEventPhotos(),
    },
  };
};
