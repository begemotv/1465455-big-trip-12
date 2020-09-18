import MenuView from "./view/menu.js";
import TripPresenter from "./presenter/trip.js";
import {generateEvent} from "./mock/event.js";
import {EventOfferTypes} from "./mock/offers.js";
import EventsModel from "./model/events.js";
import {render, RenderPosition} from "./utils/render.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import OffersModel from "./model/offers.js";

const EVENTS_COUNT = 15;

const events = new Array(EVENTS_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.startDate - b.startDate);

const offersModel = new OffersModel();
console.log(offersModel)
offersModel.setOffers(EventOfferTypes);
console.log(offersModel)

const siteMainElement = document.querySelector(`.page-body`);
const destinationPriceContainer = siteMainElement.querySelector(`.trip-main`); // Маршрут и стоимость
const menuElementContainer = siteMainElement.querySelector(`.trip-main__trip-controls`); // Меню
const contentContainer = siteMainElement.querySelector(`.trip-events`); // Точки

render(menuElementContainer, new MenuView(), RenderPosition.BEFOREEND);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(contentContainer, destinationPriceContainer, eventsModel, filterModel, offersModel);
const filterPresenter = new FilterPresenter(menuElementContainer, filterModel, eventsModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  console.log(`CLICK`)
  evt.preventDefault();
  tripPresenter.createTask();
});
