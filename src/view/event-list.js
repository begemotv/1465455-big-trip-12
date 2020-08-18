import {createElement} from "../utils.js";

const generateDatetime = (date) => {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  let year = date.getFullYear();

  if (month.length < 2) {
    month = `0` + month;
  }
  if (day.length < 2) {
    day = `0` + day;
  }

  return [year, month, day].join(`-`);
};

const generateDate = (date) => {
  const monthNames = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`,
    `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
  let day = date.getDate();
  let month = monthNames[date.getMonth()];

  return `${month} ${day}`;
};

const createEventListContainer = (date, index) => {
  const datetime = generateDatetime(date);
  const dateHuman = generateDate(date);
  const indexHuman = index + 1;

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${indexHuman}</span>
      <time class="day__date" datetime="${datetime}">${dateHuman}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`);
};

const getDates = (startDate, endDate) => {
  let beginDate = new Date(generateDatetime(startDate));
  let finishDate = new Date(generateDatetime(endDate));
  let dates = [];
  let currentDate = new Date(beginDate);
  while (currentDate <= finishDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const createEventListMarkup = (dates) => {
  const {startDate, endDate} = dates;
  let eventListDates = getDates(startDate, endDate); // возвращается массив дат (endDate-startDate)
  let eventListMock = [];
  for (let i = 0; i < eventListDates.length; i++) {
    let eventListElement = createEventListContainer(eventListDates[i], i);
    eventListMock.push(eventListElement);
  }
  return eventListMock.join(``);
};

const generateEventListTemplate = (dates) => {
  const eventListMarkup = createEventListMarkup(dates);

  return (
    `<ul class="trip-days">
    ${eventListMarkup}
  </ul>`
  );
};

export default class EventList {
  constructor(dates) {
    this._dates = dates;
    this._element = null;
  }

  _getTemplate() {
    return generateEventListTemplate(this._dates);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
