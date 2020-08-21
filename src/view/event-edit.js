import AbstractView from "./abstract.js";
import {EVENTTYPES} from "../const.js";

const createOfferTemplate = (offer) => {
  const {name, price, offerClass} = offer;

  return (
    `<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerClass}-1" type="checkbox" name="event-offer-${offerClass}" checked>
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
  const {name} = type;
  return (
    `<div class="event__type-item">
    <input id="event-type-${name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name.toLowerCase()}">
    <label class="event__type-label  event__type-label--${name.toLowerCase()}" for="event-type-${name.toLowerCase()}-1">${name}</label>
  </div>`);
};

const createTypeTransferTemplateMarkup = (types) => {
  let typesTransfer = [];
  for (let i = 0; i < types.length; i++) {
    if (types[i].type === `transfer`) {
      typesTransfer.push(types[i]);
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
  const {name} = type;

  return (
    `<div class="event__type-item">
    <input id="event-type-${name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name.toLowerCase()}">
    <label class="event__type-label  event__type-label--${name.toLowerCase()}" for="event-type-${name.toLowerCase()}-1">${name}</label>
  </div>`);
};

const createTypeActivityTemplateMarkup = (types) => {
  let typesActivity = [];
  for (let i = 0; i < types.length; i++) {
    if (types[i].type === `activity`) {
      typesActivity.push(types[i]);
    }
  }
  let typeActivityMock = [];
  for (let i = 0; i < typesActivity.length; i++) {
    let typeActivity = createTypeActivityTemplate(typesActivity[i]);
    typeActivityMock.push(typeActivity);
  }
  return typeActivityMock.join(``);
};

const generateDate = (date) => {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  let year = date.getFullYear().toString().substr(2, 2);

  if (month.length < 2) {
    month = `0` + month;
  }
  if (day.length < 2) {
    day = `0` + day;
  }

  return [day, month, year].join(`/`);
};

const createEventEditTemplate = (event) => {
  const {type, city, price, startDate, endDate, startTime, endTime, offers} = event;
  const eventTypesTransferTemplate = createTypeTransferTemplateMarkup(EVENTTYPES);
  const eventTypesActivityTemplate = createTypeActivityTemplateMarkup(EVENTTYPES);
  const eventStartDate = generateDate(startDate);
  const eventEndDate = generateDate(endDate);
  const typeName = type.slice(0, -3).toLowerCase();
  const eventOffers = createEventEditOffersTemplate(offers);
  return (
    `<li class="trip-events__item">
    <form class="trip-events__item  event  event--edit" action="#" method="get">
    <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${typeName}.png" alt="Event type icon">
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
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
        <option value="Saint Petersburg"></option>
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
    <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    ${eventOffers}
    </form>
    </li>`
  );
};

export default class EventEdit extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
  }

  _getTemplate() {
    return createEventEditTemplate(this._event);
  }
}
