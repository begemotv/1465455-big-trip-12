import AbstractView from "./abstract.js";

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

const getDates = (events) => {
  let dates = [];
  for (let i = 0; i < events.length - 1; i++) {
    let currentDate = events[i].startDate.getDate();
    let nextDate = events[i + 1].startDate.getDate();
    if (i === (events.length - 1) && currentDate !== nextDate) {
      dates.push(events[events.length - 1].startDate);
    }
    if (currentDate !== nextDate) {
      dates.push(events[i].startDate);
    }
  }
  return dates;
};

const createEventListMarkup = (events) => {
  let eventListDates = getDates(events);
  let eventListMock = [];
  for (let i = 0; i < eventListDates.length; i++) {
    let eventListElement = createEventListContainer(eventListDates[i], i);
    eventListMock.push(eventListElement);
  }
  return eventListMock.join(``);
};

const generateEventListTemplate = (events) => {
  const eventListMarkup = createEventListMarkup(events);

  return (
    `<ul class="trip-days">
    ${eventListMarkup}
  </ul>`
  );
};

export default class EventList extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  _getTemplate() {
    return generateEventListTemplate(this._events);
  }
}
