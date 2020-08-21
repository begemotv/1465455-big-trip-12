import AbstractView from "./abstract.js";

const generateTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info"></section>`
  );
};

export default class TripInfo extends AbstractView {
  _getTemplate() {
    return generateTripInfoTemplate();
  }
}

