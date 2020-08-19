import TripInfoView from "./view/trip-info.js";
import TripRouteDatesView from "./view/trip-route-dates.js";
import TripPriceView from "./view/trip-price.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import EventView from "./view/event.js";
import EventListView from "./view/event-list.js";
import EventEditView from "./view/event-edit.js";
import EditEventHeaderView from "./view/event-edit-header.js";
import EventEditOffersView from "./view/event-edit-offers.js";
import EventEditDescriptionView from "./view/event-edit-description.js";
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

// const renderTask = (eventListElement, event) => {
//   const eventComponent = new EventView(event);
//   const eventEditComponent = new EventEditView(event);

//   render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
// };

const tripInfoComponent = new TripInfoView();
render(destinationPriceContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoComponent.getElement(), new TripRouteDatesView(events, dates).getElement(), RenderPosition.BEFOREEND);
render(tripInfoComponent.getElement(), new TripPriceView(events).getElement(), RenderPosition.BEFOREEND);

render(menuElementContainer, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(menuElementContainer, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(contentContainer, new SortView().getElement(), RenderPosition.BEFOREEND);

const eventEditComponent = new EventEditView(events[0]);
render(contentContainer, eventEditComponent.getElement(), RenderPosition.BEFOREEND);
render(eventEditComponent.getElement(), new EditEventHeaderView(events[0]).getElement(), RenderPosition.BEFOREEND);

const eventEditDetailsComponent = new EventEditOffersView(events[0]);
render(eventEditComponent.getElement(), eventEditDetailsComponent.getElement(), RenderPosition.BEFOREEND);
render(eventEditDetailsComponent.getElement(), new EventEditDescriptionView(events[0]).getElement(), RenderPosition.BEFOREEND);

render(contentContainer, new EventListView(dates).getElement(), RenderPosition.BEFOREEND);

const travelPointsListContainer = contentContainer.querySelectorAll(`.trip-events__list`);
const travelDaysCount = travelPointsListContainer.length;
const eventsToRender = EVENTS_COUNT - 1;
let eventsRemainder = eventsToRender % travelDaysCount;
let eventsToRenderPerDay = 0;
if (eventsRemainder === 0) {
  eventsToRenderPerDay = eventsToRender / travelDaysCount;
} else {
  const eventsToRenderPerDayEqual = Math.floor(eventsToRender / (travelDaysCount - 1));
  eventsRemainder = eventsToRender - (eventsToRenderPerDayEqual * (travelDaysCount - 1));
  eventsToRenderPerDay = (eventsToRender - eventsRemainder) / (travelDaysCount - 1);
}

let chunk = eventsToRenderPerDay;
let temparray = [];
for (let i = 0, j = 0; i < eventsToRender, j < travelDaysCount; i += chunk, j++) {
  temparray = events.slice(i, i + chunk);
  for (let k = 0; k < temparray.length; k++) {
    render(travelPointsListContainer[j], new EventView(temparray[k]).getElement(), RenderPosition.BEFOREEND);
  }
}
