import {createElement} from "../utils.js";

const generateDate = (dates) => {
  const {startDate, endDate} = dates;
  const monthNames = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`,
    `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
  let startDay = startDate.getDate();
  let month = monthNames[startDate.getMonth()];
  let endDay = endDate.getDate();

  return `${month} ${startDay}&nbsp;&mdash;&nbsp;${endDay}`;
};

const generateRoute = (events) => {
  const cityFirst = events[0].city;
  const citySecond = events[1].city;
  const cityLast = events[events.length - 1].city;

  let route = ``;
  if (events.length > 3) {
    route = `${cityFirst} &mdash; ... &mdash; ${cityLast}`;
  } else if (events.length === 2) {
    route = `${cityFirst} &mdash; ${citySecond} &mdash; ${cityLast}`;
  } else if (events.length === 1) {
    route = `${cityFirst}`;
  } else {
    route = `Choose destination`;
  }
  return route;
};

const createTripRouteDatesTemplate = (events, dates) => {
  console.log(dates)
  console.log(events)
  const route = generateRoute(events);
  const dateInterval = generateDate(dates);

  return (
    `<div class="trip-info__main">
           <h1 class="trip-info__title">${route}</h1>
            <p class="trip-info__dates">${dateInterval}</p>
        </div>`
  );
};

export default class TripRouteDates {
  constructor(events, dates) {
    this._element = null;
    this.events = events;
    this.dates = dates;
  }

  _getTemplate() {
    return createTripRouteDatesTemplate(this.events, this.dates);
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

