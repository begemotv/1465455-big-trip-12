import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripPresenter from "./presenter/trip.js";
import {generateEvent} from "./mock/event.js";
import EventsModel from "./model/events.js";
import {render, RenderPosition} from "./utils/render.js";

const EVENTS_COUNT = 15;

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.startDate - b.startDate);
// const offers = generateOffers();
// console.log(events)

const siteMainElement = document.querySelector(`.page-body`);
const destinationPriceContainer = siteMainElement.querySelector(`.trip-main`); // Маршрут и стоимость
const menuElementContainer = siteMainElement.querySelector(`.trip-main__trip-controls`); // Меню
const contentContainer = siteMainElement.querySelector(`.trip-events`); // Точки

render(menuElementContainer, new MenuView(), RenderPosition.BEFOREEND);
render(menuElementContainer, new FilterView(), RenderPosition.BEFOREEND);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const tripPresenter = new TripPresenter(contentContainer, destinationPriceContainer, eventsModel);

tripPresenter.init();
