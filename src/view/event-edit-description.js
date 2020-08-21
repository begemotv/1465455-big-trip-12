import AbstractView from "./abstract.js";

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

const createEventEditDestinationDescription = (event) => {
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

export default class EventEditDescription extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
  }

  _getTemplate() {
    return createEventEditDestinationDescription(this._event);
  }
}
