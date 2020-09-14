import EventListView from "../view/event-list.js";
import SortView from "../view/sort.js";
import NoEventsView from "../view/no-events.js";
import EventPresenter from "../presenter/event.js";
import TripInfoView from "../view/trip-info.js";
import TripPriceView from "../view/trip-price.js";
import TripRouteDatesView from "../view/trip-route-dates.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortByTime, sortByPrice} from "../utils/event.js";
import {SortType} from "../const.js";


export default class Trip {
  constructor(tripContainer, destinationPriceContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._tripContainer = tripContainer;
    this._destinationPriceContainer = destinationPriceContainer;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._noEventsComponent = new NoEventsView();
    this._tripInfoComponent = new TripInfoView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    render(this._destinationPriceContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    this._renderTrip();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._eventsModel.getEvents().slice().sort(sortByTime);
      case SortType.PRICE:
        return this._eventsModel.getEvents().slice().sort(sortByPrice);
    }

    return this._eventsModel.getEvents();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // _sortEvents(sortType) {
  //   switch (sortType) {
  //     case SortType.TIME:
  //       this._tripEvents.sort(sortByTime);
  //       break;
  //     case SortType.PRICE:
  //       this._tripEvents.sort(sortByPrice);
  //       break;
  //     default:
  //       this._tripEvents = this._sourcedTripEvents.slice();
  //   }

  //   this._currentSortType = sortType;
  // }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearEventList();
    this._renderEventList();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleEventChange(updatedEvent) {
    // this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    // this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderEvent(eventListContainer, event) {
    const eventPresenter = new EventPresenter(eventListContainer, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderNoEvents() {
    this._tripPriceComponent = new TripPriceView();
    this._tripRouteDatesComponent = new TripRouteDatesView();

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
    render(this._tripContainer, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _clearEventList() { // есть проблема. здесь без _destroyEventList не очищаются контейнеры дней. но с _destroyEventList вызов обзервера у каждого ивента становится чрезмерным, так как и без него все очищается. как правильно подойти к этой ситуации?
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._destroyEventList();
    this._eventPresenter = {};
  }

  _destroyEventList() { // добавил метод, чтобы удалять контейнеры для дней при сортировке
    remove(this._eventListComponent);
  }

  _renderEventList() {
    const events = this._getEvents().slice();

    if (this._currentSortType === `default`) {
      this._eventListComponent = new EventListView(events);
      render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

      const travelPointsListContainer = this._tripContainer.querySelectorAll(`.trip-events__list`);

      for (let i = 0, j = 0; i < events.length - 1; i++) {
        let currentEvent = events[i].startDate.getDate();
        let nextEvent = events[i + 1].startDate.getDate();
        if (i === 0) {
          this._renderEvent(travelPointsListContainer[j], events[i]);
          i++;
        }
        if (currentEvent === nextEvent) {
          this._renderEvent(travelPointsListContainer[j], events[i]);
        } else {
          j++;
          this._renderEvent(travelPointsListContainer[j], events[i]);
        }
      }
    } else {
      this._eventListComponent = new EventListView();
      render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

      const travelPointsSortContainer = this._tripContainer.querySelector(`.trip-events__list`);

      for (let i = 0; i < events.length; i++) {
        this._renderEvent(travelPointsSortContainer, events[i]);
      }
      events.forEach((event) => this._renderEvent(event));
    }
  }

  _renderTripInfo() {
    const events = this._getEvents().slice();

    this._tripPriceComponent = new TripPriceView(events);
    this._tripRouteDatesComponent = new TripRouteDatesView(events);

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    const events = this._getEvents().slice();
    if (events.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderTripInfo();
    this._renderEventList();
  }
}
