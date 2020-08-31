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
  constructor(tripContainer, destinationPriceContainer) {
    this._tripContainer = tripContainer;
    this._destinationPriceContainer = destinationPriceContainer;
    this._eventPresenter = {};

    this._sortComponent = new SortView();

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

  _renderEventList() {
    this._eventListComponent = new EventListView(this._tripEvents);
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    this._tripPriceComponent = new TripPriceView(this._tripEvents);
    this._tripRouteDatesComponent = new TripRouteDatesView(this._tripEvents);

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);

    const travelPointsListContainer = this._tripContainer.querySelectorAll(`.trip-events__list`);

    for (let i = 0, j = 0; i < this._tripEvents.length - 1; i++) {
      let currentEvent = this._tripEvents[i].startDate.getDate();
      let nextEvent = this._tripEvents[i + 1].startDate.getDate();
      if (i === 0) {
        this._renderEvent(travelPointsListContainer[j], this._tripEvents[i]);
        i++;
      }
      if (currentEvent === nextEvent) {
        this._renderEvent(travelPointsListContainer[j], this._tripEvents[i]);
      } else {
        j++;
        this._renderEvent(travelPointsListContainer[j], this._tripEvents[i]);
      }
    }
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
