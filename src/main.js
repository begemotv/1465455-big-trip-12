import MenuView from "./view/menu.js";
import MenuModel from "./model/menu.js";
import TripPresenter from "./presenter/trip.js";
import {generatePoint} from "./mock/point.js";
import {PointOfferTypes} from "./mock/offers.js";
import PointsModel from "./model/points.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import OffersModel from "./model/offers.js";
import {SortType, MenuItem} from "./const.js";
import StatsView from "./view/stats.js";
import Api from "./api.js";

const POINTS_COUNT = 15;
const AUTHORIZATION = `Basic kTerw22Idsz2317rD`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const points = new Array(POINTS_COUNT)
  .fill()
  .map(generatePoint)
  .sort((a, b) => a.startDate - b.startDate);

const api = new Api(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel();
offersModel.setOffers(PointOfferTypes);

api.getPoints().then((points1) => {
  console.log(points1);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

api.getDestinations().then((destinations) => {
  console.log(`ckick`);

  console.log(destinations);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

api.getOffers()
.then((offers1) => {
  console.log(offers1);
  offersModel.setTempOffers(offers1);
});

const siteMainElement = document.querySelector(`.page-body`);
const destinationPriceContainer = siteMainElement.querySelector(`.trip-main`);
const menuElementContainer = siteMainElement.querySelector(`.trip-main__trip-controls`);
const contentContainer = siteMainElement.querySelector(`.trip-events`);

const menuModel = new MenuModel();
const menuComponent = new MenuView(menuModel);
render(menuElementContainer, menuComponent, RenderPosition.BEFOREEND);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(contentContainer, destinationPriceContainer, pointsModel, filterModel, offersModel, menuModel);

const statsContainer = document.querySelector(`.page-body__page-main .page-body__container`);

let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  tripPresenter.currentSortType = SortType.DEFAULT;
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statsComponent);
      tripPresenter.destroy();
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();

      statsComponent = new StatsView(pointsModel.getPoints());
      render(statsContainer, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);

const filterPresenter = new FilterPresenter(menuElementContainer, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint(`TABLE`);
  menuComponent.newTaskHandler(handleSiteMenuClick, `TABLE`);
});
