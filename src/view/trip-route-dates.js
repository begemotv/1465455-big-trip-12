import AbstractView from "./abstract.js";
import {BLANK_POINT} from "../const.js";

const generateDate = (points) => {
  const startDate = points[0].startDate;
  const endDate = points[points.length - 1].endDate;
  const monthNames = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`,
    `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
  let startDay = startDate.getDate();
  let startMonth = monthNames[startDate.getMonth()];
  let endDay = endDate.getDate();
  let endMonth = monthNames[endDate.getMonth()];

  return `${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${endMonth} ${endDay}`;
};

const generateRoute = (points) => {
  const cityFirst = points[0].destination.name;
  const citySecond = points[1].destination.name;
  const cityLast = points[points.length - 1].destination.name;

  let route = ``;
  if (points.length > 3) {
    route = `${cityFirst} &mdash; ... &mdash; ${cityLast}`;
  } else if (points.length === 2) {
    route = `${cityFirst} &mdash; ${citySecond} &mdash; ${cityLast}`;
  } else if (points.length === 1) {
    route = `${cityFirst}`;
  } else {
    route = `Choose destination`;
  }
  return route;
};

const createTripRouteDatesTemplate = (points) => {
  let route = ``;
  let dateInterval = ``;
  if (points !== BLANK_POINT) {
    route = generateRoute(points);
    dateInterval = generateDate(points);
  }

  return (
    `<div class="trip-info__main">
           <h1 class="trip-info__title">${route}</h1>
            <p class="trip-info__dates">${dateInterval}</p>
        </div>`
  );
};

export default class TripRouteDates extends AbstractView {
  constructor(points) {
    super();
    this._points = points || BLANK_POINT;
    // this._dates = dates || BLANK_DATES;
  }

  _getTemplate() {
    return createTripRouteDatesTemplate(this._points);
  }
}

