export const isEventPast = (startDate) => {
  const currentDate = new Date();

  return currentDate.getTime() > startDate.getTime();
};

export const isEventFuture = (startDate) => {
  const currentDate = new Date();

  return currentDate.getTime() < startDate.getTime();
};

export const sortByTime = (eventA, eventB) => {
  return eventB.startDate.getTime() - eventA.startDate.getTime();
};

export const sortByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};
