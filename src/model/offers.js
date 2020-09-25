import Observer from "../utils/observer.js";
import {PointTypes} from "../const.js";

export default class Offers extends Observer {
  constructor() {
    super();
    // this._typeOffers = null;
    this._offers = null;
  }

  setOffers(offers) {
    this._offers = offers;
    console.log(this._offers)
  }

  getOffers() {
    return this._offers;
  }

  // setOffers(typeOffers) {
  //   this._typeOffers = typeOffers;
  //   // console.log(typeOffers)
  // }

  // getOffers(pointType) {
  //   return this._typeOffers.has(pointType)
  //     ? this._typeOffers.get(pointType)
  //     : null;
  // }

  // get pointTypes() {
  //   return Array.from(this._typeOffers.keys());
  // }

  static adaptToClient(offers) {
    return offers.reduce((mapOffer, offer) => {
      mapOffer[offer.type] = offer.offers;
      return mapOffer;
    }, {});
  }

  // static adaptToClient(offer) {
  //   const adaptedOffer = Object.assign(
  //       {},
  //       offer,
  //       {
  //         name: offer.type,
  //         offers: offer.offers.map((good) => ({
  //           name: good.title,
  //           price: good.price,
  //         }))
  //       }
  //   );

  //   delete adaptedOffer.type;
  //   delete adaptedOffer.type;

  //   return adaptedOffer;
  // }
}
