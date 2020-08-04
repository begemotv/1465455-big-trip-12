import {createDestinationPriceTemplate} from "./view/destination-price.js";
import {createMenuElementTemplate} from "./view/menu.js";
import {createFilterElementTemplate} from "./view/filter.js";
import {createSortingElementTemplate} from "./view/sorting.js";
import {createContentElementTemplate} from "./view/content.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-body`);
const destinationPriceElement = siteMainElement.querySelector(`.trip-main`); // Маршрут и стоимость
const menuElementContainer = siteMainElement.querySelector(`.trip-main__trip-controls`); // Меню контейнер
const menuElement = menuElementContainer.querySelector(`.visually-hidden`); // Найдет первый элемент с таким классом, чтобы после него вставить элемент меню с (afterend)
const filterElement = siteMainElement.querySelector(`.trip-main__trip-controls`); // Фильтры
const contentElement = siteMainElement.querySelector(`.trip-events`); // Сортировка и контент

render(destinationPriceElement, createDestinationPriceTemplate(), `afterbegin`);
render(menuElement, createMenuElementTemplate(), `afterend`);
render(filterElement, createFilterElementTemplate(), `beforeend`);
render(contentElement, createSortingElementTemplate(), `beforeend`);
render(contentElement, createContentElementTemplate(), `beforeend`);
