import AbstractView from "./abstract.js";

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

const createPointEditOffersTemplate = (point) => {
  const {offers} = point;
  const pointOffersTemplate = createOfferTemplateMarkup(offers);

  return (
    `<section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                ${pointOffersTemplate}
                </div>
              </section>
            </section>`
  );
};

export default class PointEditOffers extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  _getTemplate() {
    return createPointEditOffersTemplate(this._point);
  }
}
