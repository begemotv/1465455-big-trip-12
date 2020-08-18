import {createElement} from "../utils.js";

export default class EventEdit {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post"></form>`
    );
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
