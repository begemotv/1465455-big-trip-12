import {EventOfferTypes} from "../mock/offers.js";

export const sortByTime = (eventA, eventB) => {
  return eventB.durationMSec - eventA.durationMSec;
};

export const sortByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const getOffers = (type) => {
  return EventOfferTypes.has(type)
    ? EventOfferTypes.get(type)
    : null;
};
