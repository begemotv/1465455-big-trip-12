import AbstractView from "./abstract.js";
import {BLANK_EVENT} from "../const.js";

const generateDate = (events) => {
  const startDate = events[0].startDate;
  const endDate = events[events.length - 1].endDate;
  const monthNames = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`,
    `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
  let startDay = startDate.getDate();
  let startMonth = monthNames[startDate.getMonth()];
  let endDay = endDate.getDate();
  let endMonth = monthNames[endDate.getMonth()];

  return `${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${endMonth} ${endDay}`;
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

const createTripRouteDatesTemplate = (events) => {
  let route = ``;
  let dateInterval = ``;
  if (events !== BLANK_EVENT) {
    route = generateRoute(events);
    dateInterval = generateDate(events);
  }

  return (
    `<div class="trip-info__main">
           <h1 class="trip-info__title">${route}</h1>
            <p class="trip-info__dates">${dateInterval}</p>
        </div>`
  );
};

export default class TripRouteDates extends AbstractView {
  constructor(events) {
    super();
    this._events = events || BLANK_EVENT;
    // this._dates = dates || BLANK_DATES;
  }

  _getTemplate() {
    return createTripRouteDatesTemplate(this._events);
  }
}

