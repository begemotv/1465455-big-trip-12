import {createDestinationPriceTemplate} from "./view/destination-price.js";
import MenuView from "./view/menu.js";
import Filter from "./view/filter.js";
import SortView from "./view/sort.js";
import EventList from "./view/event-list.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createDestinationDescription} from "./view/destination-description.js";
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

renderTemplate(destinationPriceContainer, createDestinationPriceTemplate(events, dates), `afterbegin`);
renderElement(menuElementContainer, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(menuElementContainer, new Filter().getElement(), RenderPosition.BEFOREEND);
renderElement(contentContainer, new SortView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(contentContainer, createEventEditTemplate(events[0]), `beforeend`);
renderElement(contentContainer, new EventList(dates).getElement(), RenderPosition.BEFOREEND);

const travelPointsListContainer = contentContainer.querySelector(`.trip-events__list`);

const destinationDescriptionContainer = contentContainer.querySelector(`.event__details`);

renderTemplate(destinationDescriptionContainer, createDestinationDescription(events), `beforeend`);
for (let i = 1; i < EVENTS_COUNT; i++) {
  renderTemplate(travelPointsListContainer, createEventTemplate(events[i]), `beforeend`);
}

// остались проблемы с 1) форматом дат; 2) продолжительностью путешествия; 3) разбивкой точек маршрута по контейнерам дат и привязка дат контейнеров к мокам; 4) добавлением special offers к стоимости; 5) рефакторинг
// думаю справлюсь, но наверняка есть много фидбека по структуре и читаемости
