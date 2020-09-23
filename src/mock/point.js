import {POINTDESCRIPTION} from "../const.js";
import {getRandomInteger} from "../utils/common.js";
import {PointOfferTypes} from "./offers.js";
import {getOffers} from "../utils/point.js";


export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generatePointDescriptions = () => {
  const textLength = getRandomInteger(3, 5);

  let description = ``;
  for (let i = 0; i < textLength; i++) {
    description += ` ${POINTDESCRIPTION[getRandomInteger(0, POINTDESCRIPTION.length - 1)]}`;
  }

  return description;
};

const generatePhoto = () => {
  const src = `http://picsum.photos/248/152?r=${Math.random()}`;
  const description = POINTDESCRIPTION[getRandomInteger(0, POINTDESCRIPTION.length - 1)];

  return {
    src,
    description
  };
};

const generatePointPhotos = () => {
  const photosCount = getRandomInteger(3, 5);
  let pointPhotos = [];

  for (let i = 0; i < photosCount; i++) {
    pointPhotos.push(generatePhoto());
  }

  return pointPhotos;
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
  const randomEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + getRandomInteger(0, 23), getRandomInteger(0, 59));

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

export const Destinations = new Map([
  [`Bari`, {
    description: generatePointDescriptions(),
    photos: generatePointPhotos(),
  }],
  [`Catania`, {
    description: generatePointDescriptions(),
    photos: generatePointPhotos(),
  }],
  [`Bologna`, {
    description: generatePointDescriptions(),
    photos: generatePointPhotos(),
  }],
  [`Oslo`, {
    description: generatePointDescriptions(),
    photos: generatePointPhotos(),
  }],
  [`Paris`, {
    description: generatePointDescriptions(),
    photos: generatePointPhotos(),
  }],
  [`Lisbon`, {
    description: generatePointDescriptions(),
    photos: generatePointPhotos(),
  }],
  [`Porto`, {
    description: generatePointDescriptions(),
    photos: generatePointPhotos(),
  }],
  [`Prague`, {
    description: generatePointDescriptions(),
    photos: generatePointPhotos(),
  }],
  [`Helsinki`, {
    description: generatePointDescriptions(),
    photos: generatePointPhotos(),
  }]
]);

export const cities = Array.from(Destinations.keys());

export const pointTypes = Array.from(PointOfferTypes.keys());

const getRandomPointType = () => {
  return pointTypes[getRandomInteger(0, pointTypes.length - 1)];
};

export const generatePoint = () => {
  const startDate = generateStartDate();
  const endDate = generateEndDate(startDate);
  const type = getRandomPointType();
  const tmpCities = Array.from(Destinations.keys());
  const name = tmpCities[getRandomInteger(0, tmpCities.length - 1)];
  const description = Destinations.get(name).description;
  const photos = Destinations.get(name).photos;
  const durationMSec = endDate.getTime() - startDate.getTime();
  let offers = [];
  const offersTemp = getOffers(type);
  for (let i = 0; i < offersTemp.length; i++) {
    offers[i] = {
      name: offersTemp[i].name,
      price: offersTemp[i].price,
      offerClass: offersTemp[i].offerClass,
      isActive: Boolean(getRandomInteger(0, 1))
    };
  }

  return {
    id: generateId(),
    isFavorite: false,
    type,
    startDate,
    endDate,
    durationMSec,
    price: getRandomInteger(20, 200),
    offers,
    destination: {
      name,
      description,
      photos
    },
  };
};
