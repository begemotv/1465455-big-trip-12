export const EVENTTYPES = [
  {name: `Taxi`, placeholder: ` to`, type: `transfer`},
  {name: `Bus`, placeholder: ` to`, type: `transfer`},
  {name: `Train`, placeholder: ` to`, type: `transfer`},
  {name: `Ship`, placeholder: ` to`, type: `transfer`},
  {name: `Transport`, placeholder: ` to`, type: `transfer`},
  {name: `Drive`, placeholder: ` to`, type: `transfer`},
  {name: `Flight`, placeholder: ` to`, type: `transfer`},
  {name: `Check-in`, placeholder: ` in`, type: `activity`},
  {name: `Sightseeing`, placeholder: ` in`, type: `activity`},
  {name: `Restaurant`, placeholder: ` in`, type: `activity`},
];

export const EVENTCITIES = [
  `Bari`,
  `Catania`,
  `Bologna`,
  `Hague`,
  `Oslo`,
  `Paris`,
  `Lisbon`,
  `Porto`,
  `Prague`,
  `Helsinki`
];

export const EVENTOFFERCLASS = {
  taxi: ``,
  bus: ``,
  train: [`upgrade`],
  ship: [`upgrade`],
  transport: ``,
  drive: ``,
  flight: [`upgrade`, `flight`],
  checkin: [`sightseeing`],
  sightseeing: [`sightseeing`],
  restaurant: [`restaurant`]
};

export const EVENTOFFERS = [
  {name: `Add luggage`, price: 30, offerClass: `flight`},
  {name: `Non-smoking driver`, price: 20, offerClass: `taxi`},
  {name: `Add sport inventory`, price: 50, offerClass: `flight`},
  {name: `Add excursion`, price: 45, offerClass: `sightseeing`},
  {name: `Switch to first class`, price: 100, offerClass: `upgrade`},
  {name: `Add meal`, price: 15, offerClass: `upgrade`},
  {name: `Choose seats`, price: 5, offerClass: `upgrade`},
  {name: `Book a table`, price: 5, offerClass: `restaurant`},
  {name: `Buy a rose`, price: 15, offerClass: `restaurant`},
  {name: `Buy city guide`, price: 5, offerClass: `sightseeing`},
];

export const EVENTDESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

export const BLANK_EVENT = {
  id: ``,
  type: `flight`,
  startDate: ``,
  endDate: ``,
  startTime: ``,
  endTime: ``,
  durationMSec: ``,
  price: ``,
  offers: ``,
  destination: {
    name: ``,
    description: ``,
    photos: ``
  },
};

export const BLANK_DATES = {
  startDate: ``,
  endDate: ``
};

export const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};