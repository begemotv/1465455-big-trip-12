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

export const EVENTOFFERS = [
  {name: `Add luggage`, price: 30, offerClass: `luggage`},
  {name: `Switch to comfort class`, price: 100, offerClass: `upgrade`},
  {name: `Add meal`, price: 15, offerClass: `food`},
  {name: `Choose seats`, price: 5, offerClass: `seats`},
  {name: `Add wine`, price: 10, offerClass: `food`}
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
  type: ``,
  city: ``,
  startDate: ``,
  endDate: ``,
  startTime: ``,
  endTime: ``,
  duration: ``,
  price: ``,
  offers: ``,
  offersPrice: ``,
  destination: {
    description: ``,
    photos: ``,
  },
};

export const BLANK_DATES = {
  startDate: ``,
  endDate: ``
};
