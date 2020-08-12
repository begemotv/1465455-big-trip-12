import {eventTypes} from "../const.js";
import {eventCities} from "../const.js";
import {eventOffers} from "../const.js";
import {eventDestinationDescriptions} from "../const.js";
import {getRandomInteger} from "../utils.js";

const generateEventType = () => {
  const randomIndex = getRandomInteger(0, eventTypes.length - 1);
  const randomType = eventTypes[randomIndex].name + eventTypes[randomIndex].placeholder;

  return randomType;
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, eventCities.length - 1);

  return eventCities[randomIndex];
};

// const generateEventStartDate = () => {
//   const eventStartDate = new Date();
//   console.log(eventStartDate);

//   return eventStartDate;
// };

// const generateEventEndDate = () => {
//   const eventEndDate = new Date();

//   return eventEndDate;
// };

const generateOffer = () => { // !!!!!! собрать объект, чтобы из него забрать атуальные моки (чтобы оффер и прайс брались из моков и тип был одной цены всегда)
  const randomIndex = getRandomInteger(1, eventOffers.length - 1);
  const eventOffer = eventOffer[randomIndex]; 
}

const generateEventOffers = () => {
  const randomIndex = getRandomInteger(1, 3);
  let randomOffers = [];
  for (let i = 0; i < randomIndex; i++) {
    randomOffers.push(eventOffers[i].name);
  }

  return randomOffersType;
};

const generateEventOffersName = () => {
  const randomIndex = getRandomInteger(1, eventOffers.length - 1);
  let randomOffersType = [];
  for (let i = 0; i < randomIndex; i++) {
    randomOffersType.push(eventOffers[i].name);
  }

  return randomOffersType;
};

const generateEventOffersPrice = () => {
  const randomIndex = getRandomInteger(1, eventOffers.length - 1);
  let randomOffersPrice = [];
  for (let i = 0; i < randomIndex; i++) {
    randomOffersPrice.push(eventOffers[i].price);
  }

  return randomOffersPrice;
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
};

export const generateEvent = () => {
  return {
    type: generateEventType(),
    city: generateCity(),
    // eventStartDate:
    // eventEndDate:
    price: getRandomInteger(20, 200),
    offers: {
      name: generateEventOffersName(),
      price: generateEventOffersPrice(),
    },
    destination: {
      description: generateEventDescriptions(),
      photos: generateEventPhotos(),
    },
  };
};
