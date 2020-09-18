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

const createEventListContainerSort = () => {
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`);
};

const getDates = (events) => {
  let dates = [];
  let currentDate = events[0].startDate.getDate();
  for (let i = 0; i < events.length; i++) {
    if (i === 0) {
      dates.push(events[i].startDate);
      continue;
    }
    if (currentDate === events[i].startDate.getDate()) {
      continue;
    }
    if (currentDate !== events[i].startDate.getDate()) {
      currentDate = events[i].startDate.getDate();
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
  let eventListMarkup = ``;
  if (events === undefined) {
    eventListMarkup = createEventListContainerSort();
  } else {
    eventListMarkup = createEventListMarkup(events);
  }

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
