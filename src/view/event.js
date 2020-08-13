const createEventOffer = (event) => {
  const {name, price} = event;

  return (
    `<li class="event__offer">
    <span class="event__offer-title">${name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`);
};

const createOfferMarkup = (event) => {
  const {offers} = event;

  let offerMock = [];
  for (let i = 0; i < offers.length; i++) {
    let offer = createEventOffer(offers[i]);
    offerMock.push(offer);
  }
  return offerMock.join(``);
};

const generateStartDate = (date) => {
  const startYear = date.getFullYear();
  const startMonth = date.getMonth();
  const startDay = date.getDate();
  if (startMonth <= 9) {
    return startYear + `-` + `0` + startMonth + `-` + startDay;
  } else {
    return startYear + `-` + startMonth + `-` + startDay;
  }
};

const generateEndDate = (date) => {
  const endYear = date.getFullYear();
  const endMonth = date.getMonth();
  const endDay = date.getDate();
  if (endMonth <= 9) {
    return endYear + `-` + `0` + endMonth + `-` + endDay;
  } else {
    return endYear + `-` + endMonth + `-` + endDay;
  }
};

export const createEventTemplate = (event) => {
  const {type, city, price, startDate, endDate, startTime, endTime} = event;
  const offerMarkup = createOfferMarkup(event);
  const eventStartDate = generateStartDate(startDate);
  const eventEndDate = generateEndDate(endDate);
  const eventTypeUpper = type.slice(0, -3);
  const eventType = eventTypeUpper.toLowerCase();

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${eventStartDate}T${startTime}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${eventEndDate}T${endTime}">${endTime}</time>
        </p>
        <p class="event__duration">1H 20M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offerMarkup}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};
