import {createElement} from "../utils.js";

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

export const createEventEditOffersTemplate = (event) => {
  const {offers} = event;
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

export default class EventEditOffers {
  constructor(event) {
    this._element = null;
    this.event = event;
  }

  _getTemplate() {
    return createEventEditOffersTemplate(this.event);
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
