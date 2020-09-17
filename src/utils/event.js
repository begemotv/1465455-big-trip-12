export const sortByTime = (eventA, eventB) => {
  return eventB.durationMSec - eventA.durationMSec;
};

export const sortByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

