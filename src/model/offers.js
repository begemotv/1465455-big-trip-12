import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._typeOffers = null;
  }

  setOffers(typeOffers) {
    this._typeOffers = typeOffers;
  }

  getOffers(pointType) {
    return this._typeOffers.has(pointType)
      ? this._typeOffers.get(pointType)
      : null;
  }

  get pointTypes() {
    return Array.from(this._typeOffers.keys());
  }
}
