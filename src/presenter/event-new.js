import EventEditView from "../view/event-edit.js";
import {generateId} from "../mock/event.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import {BLANK_EVENT} from "../const.js";

export default class EventNew {
  constructor(tripContainer, changeData, offersModel) {
    this._offersModel = offersModel;
    this._tripContainer = tripContainer;
    this._changeData = changeData;

    this._eventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }
    const eventList = this._tripContainer.querySelector(`.trip-days`);

    this._eventEditComponent = new EventEditView(BLANK_EVENT, this._offersModel);

    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tripContainer, this._eventEditComponent, RenderPosition.BEFOREBEGIN, eventList);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, event)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
