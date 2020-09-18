import EventListView from "../view/event-list.js";
import SortView from "../view/sort.js";
import NoEventsView from "../view/no-events.js";
import EventPresenter from "../presenter/event.js";
import EventNewPresenter from "../presenter/event-new.js";
import TripInfoView from "../view/trip-info.js";
import TripPriceView from "../view/trip-price.js";
import TripRouteDatesView from "../view/trip-route-dates.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {sortByTime, sortByPrice} from "../utils/event.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";


export default class Trip {
  constructor(tripContainer, destinationPriceContainer, eventsModel, filterModel, offersModel) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    console.log(this._offersModel)
    this._tripContainer = tripContainer;
    this._destinationPriceContainer = destinationPriceContainer;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};

    this._sortComponent = null;

    this._noEventsComponent = new NoEventsView();
    this._tripInfoComponent = new TripInfoView();
    this._tripPriceComponent = new TripPriceView();
    this._tripRouteDatesComponent = new TripRouteDatesView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    // const tripList = tripContainer.querySelector(`.trip-days`);
    // this._tripListContainer = tripList;

    this._eventNewPresenter = new EventNewPresenter(this._tripContainer, this._handleViewAction, this._offersModel);
  }

  init() {
    this._renderTrip();
  }

  createTask() {
    console.log(`CLICK`)
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    console.log(`CLICK`)
    this._eventNewPresenter.init();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredEvents.sort(sortByTime);
      case SortType.PRICE:
        return filtredEvents.sort(sortByPrice);
    }

    return filtredEvents;
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  // _handleEventChange(updatedEvent) {
  //   // this._tripEvents = updateItem(this._tripEvents, updatedEvent);
  //   // this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
  //   this._eventPresenter[updatedEvent.id].init(updatedEvent);
  // }

  _renderEvent(eventListContainer, event) {
    const eventPresenter = new EventPresenter(eventListContainer, this._handleViewAction, this._handleModeChange, this._offersModel);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderNoEvents() {
    this._noEventsComponent = new NoEventsView();
    this._tripPriceComponent = new TripPriceView();
    this._tripRouteDatesComponent = new TripRouteDatesView();

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
    render(this._tripContainer, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTrip({resetSortType = false} = {}) {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};


    remove(this._sortComponent);
    remove(this._noEventsComponent);
    remove(this._eventListComponent);
    remove(this._tripInfoComponent);
    remove(this._tripPriceComponent);
    remove(this._tripRouteDatesComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderEventList() {
    const events = this._getEvents().slice();
    console.log(events)

    if (this._currentSortType === `sort-event`) {
      const eventsSorted = events.sort((a, b) => (a.startDate - b.startDate));
      this._eventListComponent = new EventListView(eventsSorted);
      render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

      const travelPointsListContainer = this._tripContainer.querySelectorAll(`.trip-events__list`);
     
      let currentDate = eventsSorted[0].startDate.getDate();
      for (let i = 0, j = 0; i < eventsSorted.length; i++) {
        if (currentDate === eventsSorted[i].startDate.getDate()) {
          this._renderEvent(travelPointsListContainer[j], eventsSorted[i]);
        } else {
          j++;
          currentDate = eventsSorted[i].startDate.getDate();
          this._renderEvent(travelPointsListContainer[j], eventsSorted[i]);
        }
      }
    }

    if (this._currentSortType !== `sort-event`) {
      this._eventListComponent = new EventListView();
      render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

      const travelPointsSortContainer = this._tripContainer.querySelector(`.trip-events__list`);

      events.forEach((event) => this._renderEvent(travelPointsSortContainer, event));
    }
  }


  //   let currentEvent = eventsSorted[i].startDate.getDate();
  //   let nextEvent = eventsSorted[i + 1].startDate.getDate();
  //   console.log(`i: ${i}`)
  //   console.log(`j: ${j}`)
  //   console.log(`Current Event: ${currentEvent}`)
  //   console.log(`Next Event: ${nextEvent}`)
  //   if (i === 0) {
  //     this._renderEvent(travelPointsListContainer[j], eventsSorted[i]);
  //     continue;
  //   }
  //   console.log(`Event type and destination: ${eventsSorted[i].type.name} ${eventsSorted[i].destination.name}`)
  //   if (currentEvent === nextEvent) {
  //     this._renderEvent(travelPointsListContainer[j], eventsSorted[i]);
  //   } else {
  //     j++;
  //     this._renderEvent(travelPointsListContainer[j], eventsSorted[i]);
  //   }
  // }
  // this._renderEvent(travelPointsListContainer[travelPointsListContainer.length - 1], eventsSorted[eventsSorted.length - 1])

  _renderTripInfo() {
    const events = this._getEvents().slice();
    const eventsSorted = events.sort((a, b) => (a.startDate - b.startDate));

    if (this._tripInfoComponent !== null) {
      this._tripInfoComponent = null;
    }

    if (this._tripPriceComponent !== null) {
      this._tripPriceComponent = null;
    }

    if (this._tripRouteDatesComponent !== null) {
      this._tripRouteDatesComponent = null;
    }

    this._tripInfoComponent = new TripInfoView();
    this._tripPriceComponent = new TripPriceView(eventsSorted);
    this._tripRouteDatesComponent = new TripRouteDatesView(eventsSorted);

    render(this._destinationPriceContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    const events = this._getEvents().slice();
    if (events.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderTripInfo();
    this._renderSort();
    this._renderEventList();
  }
}
