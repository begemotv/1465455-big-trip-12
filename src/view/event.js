import {getRandomInteger} from "../utils.js";
import {eventOffers} from "../const.js";

const createOffer = (event) => { // изменить используя моки
  const {offers} = event;
  console.log(event);
  console.log(offers);
//   const offers = eventOffers.map(({name, price}) => `<li class="event__offer">
//   <span class="event__offer-title">${name}</span>
//   &plus;
//   &euro;&nbsp;<span class="event__offer-price">${price}</span>
//  </li>`);

  const offersToShow = [];
  for (let i = 0; i < getRandomInteger(1, 3); i++) {
    const randomIndex = getRandomInteger(1, offers.length - 1);
    offersToShow.push(offers.splice(randomIndex, 1));
  }
  return offersToShow; 
};

export const createEventTemplate = (event) => {
  const {type, city, price} = event;
  // let arr = [];
  // arr.push(city);
  // console.log(arr);
  let offerMock = [];
  for (let i = 0; i < getRandomInteger(1, 3); i++) {
    let offer = createOffer(event);
    offerMock.push(offer);
  } // пока что вылезает запятая в верстке. как от нее избавиться?
  console.log(offerMock);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/sightseeing.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-19T11:20">14:20</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-19T13:00">13:00</time>
        </p>
        <p class="event__duration">1H 20M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offerMock}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};
