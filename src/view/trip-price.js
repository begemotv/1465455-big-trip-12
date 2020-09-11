import AbstractView from "./abstract.js";
import {BLANK_EVENT} from "../const.js";

const calculateEventsPrice = (events) => {
  let priceEvents = 0;
  for (let i = 0; i < events.length; i++) {
    priceEvents += events[i].price;
  }
  return priceEvents;
};

// const calculateOfferPrice = (event) => {
//   const {offers} = event;
//   console.log(offers)
//   let priceOffers = 0;
//   for (let i = 0; i < events.length; i++) {
//     priceOffers += events[i].offersPrice;
//   }
//   return priceOffers;
// };

const createTripPriceTemplate = (events) => {
  let price = 0;
  // let offerPrice = 0;
  // for (let i = 0; i < events.length; i++) {
  //   offerPrice += calculateOfferPrice(events[i]);
  // }
  if (events !== BLANK_EVENT) {
    price = calculateEventsPrice(events); // + offerPrice;
  }

  return (
    `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
            </p>`
  );
};

export default class TripPrice extends AbstractView {
  constructor(events) {
    super();
    this._events = events || BLANK_EVENT;
  }

  _getTemplate() {
    return createTripPriceTemplate(this._events);
  }
}


