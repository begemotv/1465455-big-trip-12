export const getEventTypeMoneyMap = (events) => {
  const total = new Map();

  for (const event of events) {
    if (!total.has(event.type.name)) {
      total.set(event.type.name, 0);
    }

    const price = total.get(event.type.name) + event.price;
    total.set(event.type.name, price);
  }
  return total;
};

export const getTransportUsageMap = (events) => {
  const total = new Map();

  for (const event of events) {
    if (event.type.placeholder !== ` to`) {
      continue;
    }

    if (!total.has(event.type.name)) {
      total.set(event.type.name, 0);
    }

    const count = total.get(event.type.name) + 1;
    total.set(event.type.name, count);
  }

  return total;
};

export const getTimeSpentMap = (events) => {
  const total = new Map();

  // Подсчет количества времени для каждого типа точки маршрута
  for (const event of events) {
    if (!total.has(event.type.name)) {
      total.set(event.type.name, 0);
    }

    const value = total.get(event.type.name);
    const difValue = event.endDate - event.startDate;
    total.set(event.type.name, value + difValue);
  }

  return total;
};
