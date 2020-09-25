import AbstractView from "./abstract.js";

const createEventMessageTemplate = () => {
  return (
    `<p class="trip-events__msg">LOADING...</p>`
  );
};

export default class EventMessage extends AbstractView {
  constructor() {
    super();
  }

  _getTemplate() {
    return createEventMessageTemplate();
  }
}
