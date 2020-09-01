export const sortByTime = (eventA, eventB) => {
  return eventB.startDate.getTime() - eventA.startDate.getTime();
};

export const sortByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};
