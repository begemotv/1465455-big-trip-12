import moment from "moment";

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
  isFavorite: false,
  type: {
    name: `Bus`,
    icon: `img/icons/bus.png`,
    placeholder: ` to`,
    type: `transfer`,
  },
  startDate: moment()._d,
  endDate: moment().add(1, `days`)._d,
  durationMSec: 0,
  price: 0,
  offers: [],
  destination: {
    name: ``,
    description: ``,
    photos: ``
  },
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

export const MenuItem = {
  TABLE: `TABLE`,
  STATS: `STATS`
};
