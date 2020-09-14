import EventListView from "../view/event-list.js";
import SortView from "../view/sort.js";
import NoEventsView from "../view/no-events.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import TripInfoView from "../view/trip-info.js";
import TripPriceView from "../view/trip-price.js";
import TripRouteDatesView from "../view/trip-route-dates.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {sortByTime, sortByPrice} from "../utils/event.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripContainer, destinationPriceContainer) {
    this._tripContainer = tripContainer;
    this._destinationPriceContainer = destinationPriceContainer;
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new SortView();
    this._noEventsComponent = new NoEventsView();
    this._tripInfoComponent = new TripInfoView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();

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
    this._tripPriceComponent = new TripPriceView();
    this._tripRouteDatesComponent = new TripRouteDatesView();

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
    render(this._tripContainer, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _clearEventList() {
    this._eventListComponent.getElement().innerHTML = ``;
  }

  _renderTripInfo() {
    this._tripPriceComponent = new TripPriceView(this._tripEvents);
    this._tripRouteDatesComponent = new TripRouteDatesView(this._tripEvents, this._tripDates);

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
  }

  _renderEventList() {
    if (this._currentSortType === `default`) {
      this._eventListComponent = new EventListView(this._tripEvents);
      render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

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
    } else {
      this._eventListComponent = new EventListView();
      render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);

      const travelPointsSortContainer = this._tripContainer.querySelector(`.trip-events__list`);

      for (let i = 0; i < this._tripEvents.length; i++) {
        this._renderEvent(travelPointsSortContainer, this._tripEvents[i]);
      }
    }
  }


  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderTripInfo();
    this._renderSort();
    this._renderEventList();
  }
}
