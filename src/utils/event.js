export const isEventPast = (startDate) => {
  const currentDate = new Date();

  return currentDate.getTime() > startDate.getTime();
};

export const isEventFuture = (startDate) => {
  const currentDate = new Date();

  return currentDate.getTime() < startDate.getTime();
};
