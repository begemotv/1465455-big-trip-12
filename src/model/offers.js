import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._typeOffers = null;
  }

  setOffers(typeOffers) {
    this._typeOffers = typeOffers;
  }

  getOffers(eventType) {
    return this._typeOffers.has(eventType)
      ? this._typeOffers.get(eventType)
      : null;
  }

  get eventTypes() {
    return Array.from(this._typeOffers.keys());
  }
}
