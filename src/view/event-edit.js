import SmartView from "./smart.js";
import {cities, Destinations} from "../mock/event.js";
import {eventTypes} from "../mock/offers.js";
import {formatEventInputDate, generateTime} from "../utils/date-time.js";
import {BLANK_EVENT} from "../const.js";
import {getOffers} from "../utils/event.js";

import flatpickr from "flatpickr";
import he from "he";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createOfferTemplate = (offer) => {
  const {name, price, offerClass, isActive} = offer;

  return (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerClass}-1" type="checkbox" name="event-offer-${offerClass}" ${isActive ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${offerClass}-1">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
  </div>`);
};

const createOfferTemplateMarkup = (offers) => {
  let offerMock = [];
  for (let i = 0; i < offers.length; i++) {
    let offer = createOfferTemplate(offers[i]);
    offerMock.push(offer);
  }
  return offerMock.join(``);
};

const createEventEditOffersTemplate = (offers) => {
  const eventOffersTemplate = createOfferTemplateMarkup(offers);

  return (
    `<section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                ${eventOffersTemplate}
                </div>
              </section>
            </section>`
  );
};

const createTypeTransferTemplate = (type) => {
  return (
    `<div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`);
};

const createTypeTransferTemplateMarkup = (types) => {
  let typesTransfer = [];
  for (let i = 0; i < types.length; i++) {
    if (types[i].type === `transfer`) {
      typesTransfer.push(types[i].name);
    }
  }
  let typeTransferMock = [];
  for (let i = 0; i < typesTransfer.length; i++) {
    let typeTransfer = createTypeTransferTemplate(typesTransfer[i]);
    typeTransferMock.push(typeTransfer);
  }
  return typeTransferMock.join(``);
};

const createTypeActivityTemplate = (type) => {
  return (
    `<div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`);
};

const createTypeActivityTemplateMarkup = (types) => {
  let typesActivity = [];
  for (let i = 0; i < types.length; i++) {
    if (types[i].type === `activity`) {
      typesActivity.push(types[i].name);
    }
  }
  let typeActivityMock = [];
  for (let i = 0; i < typesActivity.length; i++) {
    let typeActivity = createTypeActivityTemplate(typesActivity[i]);
    typeActivityMock.push(typeActivity);
  }
  return typeActivityMock.join(``);
};

const createPhoto = (photo) => {
  const {src, description} = photo;
  return (
    `<img class="event__photo" src="${src}" alt="${description}">`);
};

const createPhotosMarkup = (destination) => {
  let photosMock = [];
  for (let i = 0; i < destination.photos.length; i++) {
    let photo = createPhoto(destination.photos[i]);
    photosMock.push(photo);
  }
  return photosMock.join(``);
};

const createCityMarkup = (city) => {
  return (
    `<option value="${city}"></option>`);
};

const createDestinationListMarkup = () => {
  let citiesMock = [];
  for (let i = 0; i < cities.length; i++) {
    let city = createCityMarkup(cities[i]);
    citiesMock.push(city);
  }
  return citiesMock.join(``);
};

const createEventEditTemplate = (data) => {
  const {type, price, startDate, endDate, offers, destination, isFavorite} = data;
  const eventTypesTransferTemplate = createTypeTransferTemplateMarkup(eventTypes);
  const eventTypesActivityTemplate = createTypeActivityTemplateMarkup(eventTypes);
  const eventStartDate = formatEventInputDate(startDate);
  const eventEndDate = formatEventInputDate(endDate);
  let eventOffers = ``;
  if (offers.length !== 0) {
    eventOffers = createEventEditOffersTemplate(offers);
  }
  const photosMarkup = createPhotosMarkup(destination);
  const destinationList = createDestinationListMarkup();
  const startTime = generateTime(startDate);
  const endTime = generateTime(endDate);
  return (
    `<li style="list-style:none" class="trip-events__item">
    <form class="trip-events__item  event  event--edit" action="#" method="get">
    <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="${type.icon}" alt="${type.type}">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
          ${eventTypesTransferTemplate}
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${eventTypesActivityTemplate}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type.name}${type.placeholder}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${destinationList}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartDate} ${startTime}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndDate} ${endTime}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>

    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite === true ? `checked` : ``}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    </header>
    ${eventOffers}
    ${destination.name !== `` ? `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosMarkup}
      </div>
    </div>
  </section>` : ``}
    </form>
    </li>`
  );
};

export default class EventEdit extends SmartView {
  constructor(event = BLANK_EVENT, offersModel) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._offersModel = offersModel;

    this._startDatepicker = null;
    this._endDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._startDateTimeChangeHandler = this._startDateTimeChangeHandler.bind(this);
    this._endDateTimeChangeHandler = this._endDateTimeChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._arrowCloseHandler = this._arrowCloseHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  _getTemplate() {
    return createEventEditTemplate(this._data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._data);
  }

  _eventTypeChangeHandler(evt) {
    evt.preventDefault();
    const tmpEventType = this._offersModel.eventTypes.find((eventType) => eventType.name === evt.target.value);
    const tmpOffers = getOffers(tmpEventType);
    this.updateData({
      type: tmpEventType,
      offers: tmpOffers
    },
    false);
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const tmpDescription = Destinations.get(evt.target.value).description;
    const tmpPhotos = Destinations.get(evt.target.value).photos;
    if (cities.includes(evt.target.value)) {
      this.updateData({
        destination: {
          name: evt.target.value,
          description: tmpDescription,
          photos: tmpPhotos
        }
      },
      false);
    }
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: parseInt(evt.target.value, 10)
    },
    true);
  }

  _arrowCloseHandler(evt) {
    evt.preventDefault();
    this._callback.arrowClose();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  setArrowCloseHandler(callback) {
    this._callback.arrowClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._arrowCloseHandler);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._eventTypeChangeHandler);
    this.getElement()
      .querySelector(`#event-destination-1`)
      .addEventListener(`input`, this._destinationChangeHandler);
    this.getElement()
      .querySelector(`#event-price-1`)
      .addEventListener(`change`, this._priceChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setArrowCloseHandler(this._callback.arrowClose);
  }

  _startDateTimeChangeHandler(selectedDates) {
    const selectedDate = selectedDates[0];

    this.updateData({
      startDate: selectedDate,
      endDate: this._data.endDate
    }, false);

    this._endDatepicker.config.minDate = selectedDate;
  }

  _endDateTimeChangeHandler(selectedDates) {
    const selectedDate = selectedDates[0];

    this.updateData({
      startDate: this._data.startDate,
      endDate: selectedDate
    }, false);

    this._startDatepicker.config.maxDate = selectedDate;
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          maxDate: this._data.endDate,
          enableTime: true,
          // eslint-disable-next-line camelcase
          time_24hr: true,
          allowInput: false,
          dateFormat: `d/m/y H:i`,
          onChange: this._startDateTimeChangeHandler
        }
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          minDate: this._data.startDate,
          enableTime: true,
          // eslint-disable-next-line camelcase
          time_24hr: true,
          allowInput: false,
          dateFormat: `d/m/y H:i`,
          onChange: this._endDateTimeChangeHandler
        }
    );
  }

  reset(event) {
    this.updateData(
        EventEdit.parseEventToData(event)
    );
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {}
    );
  }
}
