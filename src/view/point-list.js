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

const createPointListContainer = (date, index) => {
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

const createPointListContainerSort = () => {
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`);
};

const getDates = (points) => {
  let dates = [];
  let currentDate = points[0].startDate.getDate();
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      dates.push(points[i].startDate);
      continue;
    }
    if (currentDate === points[i].startDate.getDate()) {
      continue;
    }
    if (currentDate !== points[i].startDate.getDate()) {
      currentDate = points[i].startDate.getDate();
      dates.push(points[i].startDate);
    }
  }
  return dates;
};

const createPointListMarkup = (points) => {
  let pointListDates = getDates(points);
  let pointListMock = [];
  for (let i = 0; i < pointListDates.length; i++) {
    let pointListElement = createPointListContainer(pointListDates[i], i);
    pointListMock.push(pointListElement);
  }
  return pointListMock.join(``);
};

const generatePointListTemplate = (points) => {
  let pointListMarkup = ``;
  if (points === undefined) {
    pointListMarkup = createPointListContainerSort();
  } else {
    pointListMarkup = createPointListMarkup(points);
  }

  return (
    `<ul class="trip-days">
    ${pointListMarkup}
  </ul>`
  );
};

export default class PointList extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  _getTemplate() {
    return generatePointListTemplate(this._points);
  }
}
