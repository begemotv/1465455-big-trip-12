export const getPointTypeMoneyMap = (points) => {
  const total = new Map();

  for (const point of points) {
    if (!total.has(point.type.name)) {
      total.set(point.type.name, 0);
    }

    const price = total.get(point.type.name) + point.price;
    total.set(point.type.name, price);
  }
  return total;
};

export const getTransportUsageMap = (points) => {
  const total = new Map();

  for (const point of points) {
    if (point.type.placeholder !== ` to`) {
      continue;
    }

    if (!total.has(point.type.name)) {
      total.set(point.type.name, 0);
    }

    const count = total.get(point.type.name) + 1;
    total.set(point.type.name, count);
  }

  return total;
};

export const getTimeSpentMap = (points) => {
  const total = new Map();

  for (const point of points) {
    if (!total.has(point.type.name)) {
      total.set(point.type.name, 0);
    }

    const value = total.get(point.type.name);
    const difValue = point.endDate - point.startDate;
    total.set(point.type.name, value + difValue);
  }

  return total;
};
