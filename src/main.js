import TripInfoView from "./view/trip-info.js";
import TripRouteDatesView from "./view/trip-route-dates.js";
import TripPriceView from "./view/trip-price.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import NoEventsView from "./view/no-events.js";
import EventView from "./view/event.js";
import EventListView from "./view/event-list.js";
import EventEditView from "./view/event-edit.js";
// import EditEventHeaderView from "./view/event-edit-header.js";
// import EventEditOffersView from "./view/event-edit-offers.js";
// import EventEditDescriptionView from "./view/event-edit-description.js";
import {generateEvent} from "./mock/event.js";
import {generateDates} from "./mock/dates.js";
import {render, RenderPosition} from "./utils.js";

const EVENTS_COUNT = 15;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);
const dates = generateDates();

const siteMainElement = document.querySelector(`.page-body`); // 1 раз обращаемся к document
const destinationPriceContainer = siteMainElement.querySelector(`.trip-main`); // Маршрут и стоимость
const menuElementContainer = siteMainElement.querySelector(`.trip-main__trip-controls`); // Меню контейнер
const contentContainer = siteMainElement.querySelector(`.trip-events`); // Сортировка и контент

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (contentContainerAll, eventsTrip) => {
  if (eventsTrip.length === 0) {
    render(contentContainerAll, new NoEventsView().getElement(), RenderPosition.BEFOREEND);
    render(tripInfoComponent.getElement(), new TripRouteDatesView().getElement(), RenderPosition.BEFOREEND);
    render(tripInfoComponent.getElement(), new TripPriceView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(tripInfoComponent.getElement(), new TripRouteDatesView(eventsTrip, dates).getElement(), RenderPosition.BEFOREEND);
  render(tripInfoComponent.getElement(), new TripPriceView(eventsTrip).getElement(), RenderPosition.BEFOREEND);
  render(contentContainerAll, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(contentContainerAll, new EventListView(dates).getElement(), RenderPosition.BEFOREEND);

  const travelPointsListContainer = contentContainerAll.querySelectorAll(`.trip-events__list`);
  const travelDaysCount = travelPointsListContainer.length;
  let eventsRemainder = EVENTS_COUNT % travelDaysCount;
  let eventsToRenderPerDay = 0;
  if (eventsRemainder === 0) {
    eventsToRenderPerDay = EVENTS_COUNT / travelDaysCount;
  } else {
    eventsToRenderPerDay = (EVENTS_COUNT - eventsRemainder) / (travelDaysCount - 1);
  }

  let temparray = [];
  for (let i = 0, j = 0; j < travelDaysCount; i += eventsToRenderPerDay, j++) {
    temparray = eventsTrip.slice(i, i + eventsToRenderPerDay);
    for (let k = 0; k < temparray.length; k++) {
      renderEvent(travelPointsListContainer[j], temparray[k]);
    }
  }
};

const tripInfoComponent = new TripInfoView();
render(destinationPriceContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
render(menuElementContainer, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(menuElementContainer, new FilterView().getElement(), RenderPosition.BEFOREEND);

renderBoard(contentContainer, events);
