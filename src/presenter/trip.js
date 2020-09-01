import EventListView from "../view/event-list.js";
import SortView from "../view/sort.js";
import NoEventsView from "../view/no-events.js";
import EventPresenter from "../presenter/event.js";
import TripInfoView from "../view/trip-info.js";
import TripPriceView from "../view/trip-price.js";
import TripRouteDatesView from "../view/trip-route-dates.js";
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortByTime, sortByPrice} from "../utils/event.js";
import {SortType} from "../const.js";


export default class Trip {
  constructor(tripContainer, destinationPriceContainer) {
    this._tripContainer = tripContainer;
    this._destinationPriceContainer = destinationPriceContainer;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._noEventsComponent = new NoEventsView();
    this._tripInfoComponent = new TripInfoView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();

    this._eventListComponent = new EventListView(this._tripEvents);
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    render(this._destinationPriceContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    this._renderTrip();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortByPrice);
        break;
      default:
        this._tripEvents = this._sourcedTripEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    this._renderEventList();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleEventChange(updatedEvent) {
    this._boardTasks = updateItem(this._boardTasks, updatedEvent);
    this._sourcedBoardTasks = updateItem(this._sourcedBoardTasks, updatedEvent);
    this._taskPresenter[updatedEvent.id].init(updatedEvent);
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

  _clearEventList() {
    this._eventListComponent.getElement().innerHTML = ``;
  }

  // _clearTaskList() {
  //   Object
  //     .values(this._eventPresenter)
  //     .forEach((presenter) => presenter.destroy());
  //   this._eventPresenter = {};
  // }

  _renderEventList() {
    // for (let i = 0; i < this._tripEvents.length; i++) {
    //   this._renderEvent(this._eventListComponent, this._tripEvents[i]);
    // }

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

  _renderTripInfo() {
    this._tripPriceComponent = new TripPriceView(this._tripEvents);
    this._tripRouteDatesComponent = new TripRouteDatesView(this._tripEvents, this._tripDates);

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderTripInfo();
    this._renderEventList();
  }
}
