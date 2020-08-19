import TripInfoView from "./view/trip-info.js";
import TripRouteDatesView from "./view/trip-route-dates.js";
import TripPriceView from "./view/trip-price.js";
import MenuView from "./view/menu.js";
import Filter from "./view/filter.js";
import SortView from "./view/sort.js";
import EventList from "./view/event-list.js";
import EventEditView from "./view/event-edit.js";
import EditEventHeaderView from "./view/event-edit-header.js";
import EventEditOffersView from "./view/event-edit-offers.js";
import EventEditDescription from "./view/event-edit-description.js";
import {createEventTemplate} from "./view/event.js";
import {generateEvent} from "./mock/event.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";
import {generateDates} from "./mock/dates.js";

const EVENTS_COUNT = 15;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);
const dates = generateDates();

const siteMainElement = document.querySelector(`.page-body`); // 1 раз обращаемся к document
const destinationPriceContainer = siteMainElement.querySelector(`.trip-main`); // Маршрут и стоимость
const menuElementContainer = siteMainElement.querySelector(`.trip-main__trip-controls`); // Меню контейнер
const contentContainer = siteMainElement.querySelector(`.trip-events`); // Сортировка и контент

const tripInfoComponent = new TripInfoView();
renderElement(destinationPriceContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripInfoComponent.getElement(), new TripRouteDatesView(events, dates).getElement(), RenderPosition.BEFOREEND);
renderElement(tripInfoComponent.getElement(), new TripPriceView(events).getElement(), RenderPosition.BEFOREEND);

renderElement(menuElementContainer, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(menuElementContainer, new Filter().getElement(), RenderPosition.BEFOREEND);
renderElement(contentContainer, new SortView().getElement(), RenderPosition.BEFOREEND);

const eventEditComponent = new EventEditView(events[0]);
renderElement(contentContainer, eventEditComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(eventEditComponent.getElement(), new EditEventHeaderView(events[0]).getElement(), RenderPosition.BEFOREEND);
const eventEditDetailsComponent = new EventEditOffersView(events[0]);
renderElement(eventEditComponent.getElement(), eventEditDetailsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(eventEditDetailsComponent.getElement(), new EventEditDescription(events[0]).getElement(), RenderPosition.BEFOREEND);

renderElement(contentContainer, new EventList(dates).getElement(), RenderPosition.BEFOREEND);

const travelPointsListContainer = contentContainer.querySelector(`.trip-events__list`);

for (let i = 1; i < EVENTS_COUNT; i++) {
  renderTemplate(travelPointsListContainer, createEventTemplate(events[i]), `beforeend`);
}

// остались проблемы с 1) разбивкой точек маршрута по контейнерам дат и привязка дат контейнеров к мокам
