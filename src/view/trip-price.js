import {createElement} from "../utils.js";
<<<<<<< HEAD
import {BLANK_EVENT} from "../const.js";
=======
>>>>>>> module4-task1

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
<<<<<<< HEAD
  let price = 0;
  if (events !== BLANK_EVENT) {
    price = calculateEventsPrice(events) + calculateOffersPrice(events);
  }
=======
  const price = calculateEventsPrice(events) + calculateOffersPrice(events);
>>>>>>> module4-task1

  return (
    `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
            </p>`
  );
};

export default class TripPrice {
  constructor(events) {
    this._element = null;
<<<<<<< HEAD
    this._events = events || BLANK_EVENT;
=======
    this._events = events;
>>>>>>> module4-task1
  }

  _getTemplate() {
    return createTripPriceTemplate(this._events);
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


