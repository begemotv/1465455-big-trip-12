import {createElement} from "../utils.js";
import {generateDates} from "../mock/dates.js";

const getDates = (startDate, endDate) => {
  let dateArray = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
};

const generateDatetime = (date) => {
  const datetime = new Date(date);
  let month = `` + (datetime.getMonth() + 1);
  let day = `` + datetime.getDate();
  let year = datetime.getFullYear();

  if (month.length < 2) {
    month = `0` + month;
  }
  if (day.length < 2) {
    day = `0` + day;
  }

  return [year, month, day].join(`-`);
};

const generateDate = (date) => {
  const monthNames = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUNE`,
    `JULY`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`
  ];
  const dateHuman = new Date(date);
  let day = dateHuman.getDate();
  let month = monthNames[dateHuman.getMonth()];

  if (day.length < 2) {
    day = `0` + day;
  }

  return `${month} ${day}`;
}

const generateEventListTemplate = (dates) => {
  const {startDate, endDate} = dates;
  const startDatetime = generateDatetime(startDate);
  const endDatetime = generateDatetime(endDate);
  const startDateHuman = generateDate(startDate);
  const endDateHuman = generateDate(endDate);
  console.log(startDateHuman);
  console.log(endDateHuman);


  return (
    `<ul class="trip-days">
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>

    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">2</span>
        <time class="day__date" datetime="2019-03-19">MAR 19</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>

    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">3</span>
        <time class="day__date" datetime="2019-03-18">MAR 20</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>
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
