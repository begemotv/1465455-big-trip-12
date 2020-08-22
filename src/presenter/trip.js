import EventListView from "../view/event-list.js";
import SortView from "../view/sort.js";
import NoEventsView from "../view/no-task.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer, tripDates) {
    this._tripContainer = tripContainer;
    this._tripDates = tripDates;

    this._sortComponent = new SortView();
    this._eventListComponent = new EventListView(this._tripDates);
    this._noEventsComponent = new NoEventsView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(eventListElement, event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceEventToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToEvent = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceEventToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
  }

  // _renderEvents() {
  //   this._tripEvents
  //     .forEach((boardTask) => this._renderTask(boardTask));
  // }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventList() {
    const travelPointsListContainer = this._tripContainer.querySelectorAll(`.trip-events__list`);
    const travelDaysCount = travelPointsListContainer.length;
    let eventsRemainder = this._tripEvents.length % travelDaysCount;
    let eventsToRenderPerDay = 0;
    if (eventsRemainder === 0) {
      eventsToRenderPerDay = this._tripEvents.length / travelDaysCount;
    } else {
      eventsToRenderPerDay = (this._tripEvents.length - eventsRemainder) / (travelDaysCount - 1);
    }

    let temparray = [];
    for (let i = 0, j = 0; j < travelDaysCount; i += eventsToRenderPerDay, j++) {
      temparray = this._tripEvents.slice(i, i + eventsToRenderPerDay);
      for (let k = 0; k < temparray.length; k++) {
        this._renderEvent(travelPointsListContainer[j], temparray[k]);
      }
    }

    // this._renderEvents(0, Math.min(this._tripEvents.length, TASK_COUNT_PER_STEP));
  }

  _renderTrip() {
    if (this._tripEvents === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventList();
  }
}
