import AbstractView from "./abstract.js";

const createPhoto = (photo) => {

  return (
    `<img class="event__photo" src="${photo}" alt="Point photo">`);
};

const createPhotosMarkup = (point) => {
  const {destination} = point;
  let photosMock = [];
  for (let i = 0; i < destination.photos.length; i++) {
    let photo = createPhoto(destination.photos[i]);
    photosMock.push(photo);
  }
  return photosMock.join(``);
};

const createPointEditDestinationDescription = (point) => {
  const {destination} = point;
  const photosMarkup = createPhotosMarkup(point);

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

export default class PointEditDescription extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  _getTemplate() {
    return createPointEditDestinationDescription(this._point);
  }
}
