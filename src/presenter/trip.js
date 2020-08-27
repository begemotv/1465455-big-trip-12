import EventListView from "../view/event-list.js";
import SortView from "../view/sort.js";
import NoEventsView from "../view/no-events.js";
import EventPresenter from "../presenter/event.js";
import TripInfoView from "../view/trip-info.js";
import TripPriceView from "../view/trip-price.js";
import TripRouteDatesView from "../view/trip-route-dates.js";
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

export default class Trip {
  constructor(tripContainer, destinationPriceContainer, tripDates) {
    this._tripContainer = tripContainer;
    this._destinationPriceContainer = destinationPriceContainer;
    this._tripDates = tripDates;
    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._eventListComponent = new EventListView(this._tripDates);
    this._noEventsComponent = new NoEventsView();
    this._tripInfoComponent = new TripInfoView();

    this._handleEventChange = this._handleEventChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    render(this._destinationPriceContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    this._renderTrip();
  }

  _handleEventChange(updatedEvent) {
    this._boardTasks = updateItem(this._boardTasks, updatedEvent);
    this._sourcedBoardTasks = updateItem(this._sourcedBoardTasks, updatedEvent);
    this._taskPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(eventListContainer, event) {
    const eventPresenter = new EventPresenter(eventListContainer, this._handleEventChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  // _renderEvents() {
  //   this._tripEvents
  //     .forEach((boardTask) => this._renderTask(boardTask));
  // }

  _renderNoEvents() {
    this._tripPriceComponent = new TripPriceView();
    this._tripRouteDatesComponent = new TripRouteDatesView();

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
    render(this._tripContainer, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventList() { // пока моки есть не знаю как убрать эту логику показа по дням
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    this._tripPriceComponent = new TripPriceView(this._tripEvents);
    this._tripRouteDatesComponent = new TripRouteDatesView(this._tripEvents, this._tripDates);

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);

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

  _clearTaskList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventList();
  }
}
