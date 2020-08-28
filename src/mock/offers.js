import {EVENTOFFERS} from "../const.js";
import {EVENTOFFERCLASS} from "../const.js";

const getEventOffers = (offerType) => {
  let offers = [];
  if (!offerType) {
    offers = ``;
    return offers;
  }
  for (let i = 0; i < offerType.length; i++) {
    
  }

}

export const generateOffers = () => {
  return {
    taxi: getEventOffers(EVENTOFFERCLASS.taxi)
      {name: `Non-smoking driver`, price: 20, offerClass: `taxi`},
    ],
    bus: ``,
    train: [`upgrade`],
    ship: [`upgrade`],
    transport: ``,
    drive: ``,
    flight: [`upgrade`, `flight`],
    checkin: `sightseeing`,
    sightseeing: `sightseeing`,
    restaurant: `restaurant`
  };
};
