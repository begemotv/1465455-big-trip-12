import {createDestinationPriceTemplate} from "./view/destination-price.js";
import {createMenuElementTemplate} from "./view/menu.js";
import {createFilterElementTemplate} from "./view/filter.js";
import {createSortingElementTemplate} from "./view/sorting.js";
import {createEventListTemplate} from "./view/event-list.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createDestinationDescription} from "./view/destination-description.js";
import {createEventTemplate} from "./view/event.js";

import {generateEvent} from "./mock/event.js";

const EVENTS_COUNT = 3;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-body`); // 1 раз обращаемся к document
const destinationPriceContainer = siteMainElement.querySelector(`.trip-main`); // Маршрут и стоимость
const menuElementContainer = siteMainElement.querySelector(`.trip-main__trip-controls`); // Меню контейнер
const contentContainer = siteMainElement.querySelector(`.trip-events`); // Сортировка и контент

render(destinationPriceContainer, createDestinationPriceTemplate(), `afterbegin`);
render(menuElementContainer, createMenuElementTemplate(), `beforeend`);
render(menuElementContainer, createFilterElementTemplate(), `beforeend`);
render(contentContainer, createSortingElementTemplate(), `beforeend`);
render(contentContainer, createEventListTemplate(), `beforeend`);

const travelPointsListContainer = contentContainer.querySelector(`.trip-events__list`);

render(travelPointsListContainer, createEventEditTemplate(), `beforeend`);

const destinationDescriptionContainer = contentContainer.querySelector(`.event__details`);

render(destinationDescriptionContainer, createDestinationDescription(), `beforeend`);
for (let i = 0; i < EVENTS_COUNT; i++) {
  render(travelPointsListContainer, createEventTemplate(events[i]), `beforeend`);
}

