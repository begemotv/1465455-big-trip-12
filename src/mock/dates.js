import {getRandomInteger} from "../utils.js";

const generateStartDate = () => {
  const randomStartDate = new Date(2020, getRandomInteger(1, 11), getRandomInteger(1, 23), 10, 45);
  return randomStartDate;
};

const generateEndDate = (startDate) => {
  const randomEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + getRandomInteger(3, 5), getRandomInteger(0, 20), 10);
  return randomEndDate;
};

export const generateDates = () => {
  const startDate = generateStartDate();
  const endDate = generateEndDate(startDate);

  return {
    startDate,
    endDate
  };
};
