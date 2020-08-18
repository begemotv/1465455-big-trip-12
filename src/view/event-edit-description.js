import {createElement} from "../utils.js";

const createPhoto = (photo) => {

  return (
    `<img class="event__photo" src="${photo}" alt="Event photo">`);
};

const createPhotosMarkup = (event) => {
  const {destination} = event;
  let photosMock = [];
  for (let i = 0; i < destination.photos.length; i++) {
    let photo = createPhoto(destination.photos[i]);
    photosMock.push(photo);
  }
  return photosMock.join(``);
};

export const createEventEditDestinationDescription = (event) => {
  const {destination} = event;
  // const randomIndex = getRandomInteger(1, events.length - 1);
  // const destinationDescription = events[randomIndex].destination.description;
  const photosMarkup = createPhotosMarkup(event);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosMarkup}
        </div>
      </div>
    </section>`
  );
};

export default class EventEditDescription {
  constructor(event) {
    this._element = null;
    this.event = event;
  }

  _getTemplate() {
    return createEventEditDestinationDescription(this.event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
