import AbstractView from "./abstract.js";
import {BLANK_EVENT} from "../const.js";
import {BLANK_DATES} from "../const.js";

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
  let route = ``;
  if (events !== BLANK_EVENT) {
    route = generateRoute(events);
  }

  let dateInterval = ``;
  if (dates !== BLANK_DATES) {
    dateInterval = generateDate(dates);
  }

  return (
    `<div class="trip-info__main">
           <h1 class="trip-info__title">${route}</h1>
            <p class="trip-info__dates">${dateInterval}</p>
        </div>`
  );
};

export default class TripRouteDates extends AbstractView {
  constructor(events, dates) {
    super();
    this._events = events || BLANK_EVENT;
    this._dates = dates || BLANK_DATES;
  }

  _getTemplate() {
    return createTripRouteDatesTemplate(this._events, this._dates);
  }
}

