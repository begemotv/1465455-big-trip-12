import AbstractView from "./abstract.js";
import {formatEventDate, generateDuration} from "../utils/date-time.js";
import moment from "moment";

const createEventOffer = (event) => {
  const {name, price} = event;

  return (
    `<li class="event__offer">
    <span class="event__offer-title">${name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`);
};

const createOfferMarkup = (event) => {
  const {offers} = event;
  const offersActive = offers.filter((offer) => offer.isActive === true);

  let offerMock = [];
  for (let i = 0; i < offersActive.length; i++) {
    let offer = createEventOffer(offersActive[i]);
    offerMock.push(offer);
  }
  return offerMock.join(``);
};

const createEventTemplate = (event) => {
  const {type, destination, price, startDate, endDate, startTime, endTime} = event;
  const offerMarkup = createOfferMarkup(event);
  const eventStartDate = formatEventDate(startDate);
  const eventEndDate = formatEventDate(endDate);
  const duration = generateDuration(startDate, endDate);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${type.icon}" alt="${type.type}">
      </div>
      <h3 class="event__title">${type.name}${type.placeholder} ${destination.name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${eventStartDate}T${startTime}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${eventEndDate}T${endTime}">${endTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offerMarkup}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};


export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;

    this._editClickHandler = this._editClickHandler.bind(this);
  }

  _getTemplate() {
    return createEventTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
