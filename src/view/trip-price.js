import {createElement} from "../utils.js";

const calculateEventsPrice = (events) => {
  let priceEvents = 0;
  for (let i = 0; i < events.length; i++) {
    priceEvents += events[i].price;
  }
  return priceEvents;
};

const calculateOffersPrice = (events) => {
  let priceOffers = 0;
  for (let i = 0; i < events.length; i++) {
    priceOffers += events[i].offersPrice;
  }
  return priceOffers;
};

const createTripPriceTemplate = (events) => {
  const price = calculateEventsPrice(events) + calculateOffersPrice(events);

  return (
    `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
            </p>`
  );
};

export default class TripPrice {
  constructor(events) {
    this._element = null;
    this.events = events;
  }

  _getTemplate() {
    console.log(this.events)
    return createTripPriceTemplate(this.events);
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

