import {EVENTOFFERS} from "../const.js";
import {EVENTOFFERCLASS} from "../const.js";

const getEventOffers = (offerType) => {
  let offers = [];
  if (!offerType) {
    offers = ``;
    return offers;
  }
  for (let i = 0; i < offerType.length; i++) {
    for (let j = 0; j < EVENTOFFERS.length; j++) {
      if (offerType[i] === EVENTOFFERS[j].offerClass) {
        offers.push(EVENTOFFERS[j]);
      }
    }
  }
  return offers;
}

export const generateOffers = () => {
  return {
    taxi: getEventOffers(EVENTOFFERCLASS.taxi),
    bus: getEventOffers(EVENTOFFERCLASS.bus),
    train: getEventOffers(EVENTOFFERCLASS.train),
    ship: getEventOffers(EVENTOFFERCLASS.ship),
    transport: getEventOffers(EVENTOFFERCLASS.transport),
    drive: getEventOffers(EVENTOFFERCLASS.drive),
    flight: getEventOffers(EVENTOFFERCLASS.flight),
    checkin: getEventOffers(EVENTOFFERCLASS.checkin),
    sightseeing: getEventOffers(EVENTOFFERCLASS.tasightseeingxi),
    restaurant: getEventOffers(EVENTOFFERCLASS.restaurant),
  };
};


