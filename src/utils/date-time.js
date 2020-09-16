import moment from "moment";

export const formatEventDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`YYYY-MM-DD`);
};

export const formatEventInputDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`DD/MM/YY`);
};


export const generateDuration = (startDate, endDate) => {
  let startMonth = startDate.getMonth();
  let startDay = startDate.getDate();
  let startHours = startDate.getHours();
  let startMinutes = startDate.getMinutes();
  let endDay = endDate.getDate();
  let endHours = endDate.getHours();
  let endMinutes = endDate.getMinutes();

  const month28 = 1;
  const month30 = [3, 5, 8, 10];
  const month31 = [0, 2, 4, 6, 7, 9, 11];

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
    startDay += 1;
  }

  if (startMinutes > endMinutes) {
    endMinutes += 60;
    startHours += 1;
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
    duration = `${durationDays}D ${durationHours}H ${durationMinutes}M`;
  }

  return duration;
};

export const areDatesEqual = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return true;
  }

  return moment(dateA).isSame(dateB, `minute`);
};
