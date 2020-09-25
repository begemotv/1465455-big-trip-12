import MenuView from "./view/menu.js";
import MenuModel from "./model/menu.js";
import TripPresenter from "./presenter/trip.js";
// import {Destinations, generatePoint} from "./mock/point.js";
import {PointOfferTypes} from "./mock/offers.js";
import PointsModel from "./model/points.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import {SortType, MenuItem, UpdateType} from "./const.js";
import StatsView from "./view/stats.js";
import Api from "./api.js";

// const POINTS_COUNT = 15;
const AUTHORIZATION = `Basic kTerw22Idsz2317rD`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const siteMainElement = document.querySelector(`.page-body`);
const destinationPriceContainer = siteMainElement.querySelector(`.trip-main`);
const menuElementContainer = siteMainElement.querySelector(`.trip-main__trip-controls`);
const contentContainer = siteMainElement.querySelector(`.trip-events`);

// const points = new Array(POINTS_COUNT)
//   .fill()
//   .map(generatePoint)
//   .sort((a, b) => a.startDate - b.startDate);

const api = new Api(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel();
// offersModel.setOffers(PointOfferTypes);
const pointsModel = new PointsModel();
// pointsModel.setPoints(points);
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const menuModel = new MenuModel();
const menuComponent = new MenuView(menuModel);
render(menuElementContainer, menuComponent, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(contentContainer, destinationPriceContainer, pointsModel, filterModel, offersModel, menuModel, destinationsModel, api);

const filterPresenter = new FilterPresenter(menuElementContainer, filterModel, pointsModel);

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

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint(`TABLE`);
  menuComponent.newTaskHandler(handleSiteMenuClick, `TABLE`);
});

filterPresenter.init();
tripPresenter.init();

api.getDestinations().then((destinations) => {
  destinationsModel.setDestinations(destinations);
});

api.getOffers().then((offers) => {
  offersModel.setOffers(offers);
});

api.getPoints().then((points) => {
  pointsModel.setPoints(UpdateType.MAJOR, points);
});
