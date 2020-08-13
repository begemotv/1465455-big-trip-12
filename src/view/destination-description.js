import {getRandomInteger} from "../utils.js";

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

export const createDestinationDescription = (events) => {
  const randomIndex = getRandomInteger(1, events.length - 1);
  const destinationDescription = events[randomIndex].destination.description;
  const photosMarkup = createPhotosMarkup(events[randomIndex]);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationDescription}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosMarkup}
        </div>
      </div>
    </section>`
  );
};
