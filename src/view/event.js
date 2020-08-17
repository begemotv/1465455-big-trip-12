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

const generateDate = (date) => {
  const datetime = new Date(date);
  let month = `` + (datetime.getMonth() + 1);
  let day = `` + datetime.getDate();
  let year = datetime.getFullYear();

  if (month.length < 2) {
    month = `0` + month;
  }
  if (day.length < 2) {
    day = `0` + day;
  }

  return [year, month, day].join(`-`);
};

export const createEventTemplate = (event) => {
  const {type, city, price, startDate, endDate, startTime, endTime, duration} = event;
  const offerMarkup = createOfferMarkup(event);
  const eventStartDate = generateDate(startDate);
  const eventEndDate = generateDate(endDate);
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
        <p class="event__duration">${duration}</p>
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
