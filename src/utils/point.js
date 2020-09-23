import {PointOfferTypes} from "../mock/offers.js";

export const sortByTime = (pointA, pointB) => {
  return pointB.durationMSec - pointA.durationMSec;
};

export const sortByPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const getOffers = (type) => {
  return PointOfferTypes.has(type)
    ? PointOfferTypes.get(type)
    : null;
};
