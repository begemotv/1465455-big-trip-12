import AbstractView from "./abstract.js";
import {BLANK_POINT} from "../const.js";

const calculatePointsPrice = (points) => {
  let pricePoints = 0;
  for (let i = 0; i < points.length; i++) {
    pricePoints += points[i].price;
  }
  return pricePoints;
};

const createTripPriceTemplate = (points) => {
  let price = 0;
  if (points !== BLANK_POINT) {
    price = calculatePointsPrice(points); // + offerPrice;
  }

  return (
    `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
            </p>`
  );
};

export default class TripPrice extends AbstractView {
  constructor(points) {
    super();
    this._points = points || BLANK_POINT;
  }

  _getTemplate() {
    return createTripPriceTemplate(this._points);
  }
}


