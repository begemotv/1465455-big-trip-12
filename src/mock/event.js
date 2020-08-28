import {EVENTTYPES} from "../const.js";
import {EVENTCITIES} from "../const.js";
import {EVENTOFFERS} from "../const.js";
import {EVENTDESCRIPTION} from "../const.js";
import {getRandomInteger} from "../utils/common.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateEventType = () => {
  const randomIndex = getRandomInteger(0, EVENTTYPES.length - 1);
  const randomType = EVENTTYPES[randomIndex].name + EVENTTYPES[randomIndex].placeholder;

  return randomType;
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, EVENTCITIES.length - 1);

  return EVENTCITIES[randomIndex];
};

const generateEventOffers = () => {
  const randomIndex = getRandomInteger(0, 2);
  let randomOffers = [];
  for (let i = 0; i < randomIndex; i++) {
    randomOffers.push(EVENTOFFERS[i]);
  }
  return randomOffers;
};

const generateEventOffersPrice = (offers) => {
  let offersPrice = 0;
  for (let i = 0; i < offers.length; i++) {
    offersPrice += offers[i].price;
  }
  return offersPrice;
};

const generateEventDescriptions = () => {
  const randomIndex = getRandomInteger(0, EVENTDESCRIPTION.length - 1);

  return EVENTDESCRIPTION[randomIndex];
};

const generateEventPhotos = () => {
  let eventDestinationPhotos = [];

  for (let i = 0; i < getRandomInteger(1, 4); i++) {
    let photo = `http://picsum.photos/248/152?r=${Math.random()}`;
    eventDestinationPhotos.push(photo);
  }

  return eventDestinationPhotos;
};

const generateStartDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const randomStartDate = new Date();

  randomStartDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));

  randomStartDate.setDate(randomStartDate.getDate() + daysGap);

  return randomStartDate;
};

const generateEndDate = (startDate) => {
  const randomEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + getRandomInteger(0, 1), startDate.getHours() + getRandomInteger(0, 23), getRandomInteger(0, 59));

  const month28 = 1;
  const month30 = [0, 2, 4, 6, 8, 10];
  const month31 = [3, 5, 7, 9, 11];

  if (randomEndDate.getMinutes() > 59) {
    randomEndDate.setHours(randomEndDate.getHours() + 1);
    randomEndDate.setMinutes(randomEndDate.getMinutes() - 60);
  }
  if (randomEndDate.getHours() > 23) {
    randomEndDate.setDay(randomEndDate.getDay() + 1);
    randomEndDate.setHours(randomEndDate.setHours() - 24);
  }

  if (randomEndDate.getMonth() === month28) {
    if (randomEndDate.getDay() > 28) {
      randomEndDate.setMonth(randomEndDate.getMonth() + 1);
      randomEndDate.setDay(randomEndDate.getDay() - 28);
    }
  }

  if (month30.includes(randomEndDate.getMonth())) {
    if (randomEndDate.getDay() > 30) {
      randomEndDate.setMonth(randomEndDate.getMonth() + 1);
      randomEndDate.setDay(randomEndDate.getDay() - 30);
    }
  }

  if (month31.includes(randomEndDate.getMonth())) {
    if (randomEndDate.getDay() > 31) {
      randomEndDate.setMonth(randomEndDate.getMonth() + 1);
      randomEndDate.setDay(randomEndDate.getDay() - 31);
    }
  }

  return randomEndDate;
};

const generateTime = (date) => {
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (hours.length < 2) {
    hours = `0` + hours;
  }
  if (minutes.length < 2) {
    minutes = `0` + minutes;
  }

  return [hours, minutes].join(`:`);
};

const generateDuration = (startDate, endDate) => {
  let startMonth = startDate.getMonth();
  let startDay = startDate.getDate();
  let startHours = startDate.getHours();
  let startMinutes = startDate.getMinutes();
  let endDay = endDate.getDate();
  let endHours = endDate.getHours();
  let endMinutes = endDate.getMinutes();

  const month28 = 1;
  const month30 = [0, 2, 4, 6, 8, 10];
  const month31 = [3, 5, 7, 9, 11];

  if (startDay > endDay) {
    if (startMonth === month28) {
      endDay += 28;
    }
    if (month30.includes(startMonth)) {
      endDay += 30;
    }
    if (month31.includes(startMonth)) {
      endDay += 31;
    }
  }

  if (startHours > endHours) {
    endHours += 24;
  }

  if (startMinutes > endMinutes) {
    endMinutes += 60;
  }

  let durationDays = endDay - startDay;
  let durationHours = endHours - startHours;
  let durationMinutes = endMinutes - startMinutes;

  let duration = ``;

  if (durationDays === 0) {
    if (durationHours === 0) {
      duration = `${durationMinutes}M`;
    } else {
      duration = `${durationHours}H ${durationMinutes}M`;
    }
  } else {
    if (durationHours === 0) {
      duration = `${durationDays}D ${durationMinutes}M`;
    } else {
      duration = `${durationDays}D ${durationHours}H ${durationMinutes}M`;
    }
  }

  return duration;
};

export const generateEvent = () => {
  const startDate = generateStartDate();
  const endDate = generateEndDate(startDate);
  const startTime = generateTime(startDate);
  const endTime = generateTime(endDate);
  const duration = generateDuration(startDate, endDate);
  const offers = generateEventOffers();
  const offersPrice = generateEventOffersPrice(offers);

  return {
    id: generateId(),
    type: generateEventType(),
    city: generateCity(),
    startDate, // не понимаю насколько это нужно в рамках моков
    endDate, // не понимаю насколько это нужно в рамках моков
    startTime,
    endTime,
    duration,
    price: getRandomInteger(20, 200),
    offers,
    offersPrice,
    destination: {
      description: generateEventDescriptions(),
      photos: generateEventPhotos(),
    },
  };
};
