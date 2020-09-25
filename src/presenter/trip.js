import PointListView from "../view/point-list.js";
import SortView from "../view/sort.js";
import NoPointsView from "../view/no-points.js";
import PointPresenter from "../presenter/point.js";
import PointNewPresenter from "../presenter/point-new.js";
import TripInfoView from "../view/trip-info.js";
import TripPriceView from "../view/trip-price.js";
import TripRouteDatesView from "../view/trip-route-dates.js";
import LoadingView from "../view/loading.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {sortByTime, sortByPrice} from "../utils/point.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";

export default class Trip {
  constructor(tripContainer, destinationPriceContainer, pointsModel, filterModel, offersModel, menuModel, destinationsModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._menuModel = menuModel;
    this._tripContainer = tripContainer;
    this._destinationPriceContainer = destinationPriceContainer;
    this._currentSortType = SortType.DEFAULT;
    this._pointPresenter = {};

    this._sortComponent = null;
    this._isLoading = true;
    this._api = api;
    

    this._noPointsComponent = new NoPointsView();
    this._tripInfoComponent = new TripInfoView();
    this._tripPriceComponent = new TripPriceView();
    this._tripRouteDatesComponent = new TripRouteDatesView();
    this._loadingComponent = new LoadingView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._tripContainer, this._handleViewAction, this._offersModel);
  }

  init() {
    if (this._tripInfoComponent !== null) {
      remove(this._tripInfoComponent);
    }
    if (this._tripPriceComponent !== null) {
      remove(this._tripPriceComponent);
    }
    if (this._tripRouteDatesComponent !== null) {
      remove(this._tripRouteDatesComponent);
    }

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._menuModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._menuModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortByPrice);
    }

    return filtredPoints;
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.update(updateType, response);
          });
        break;
      case UserAction.ADD_POINT:
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.add(updateType, response);
          });
        break;
      case UserAction.DELETE_POINT:
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.delete(updateType, update);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(
            data,
            this._getDestinations(),
            this._getOffers()
        );
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      remove(this._sortComponent);
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(pointListContainer, point) {
    const pointPresenter = new PointPresenter(pointListContainer, this._handleViewAction, this._handleModeChange, this._offersModel);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderNoPoints() {
    this._noPointsComponent = new NoPointsView();
    this._tripPriceComponent = new TripPriceView();
    this._tripRouteDatesComponent = new TripRouteDatesView();

    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
    render(this._tripContainer, this._noPointsComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTrip({resetSortType = false} = {}) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};


    remove(this._sortComponent);
    remove(this._noPointsComponent);
    remove(this._pointListComponent);
    // remove(this._tripInfoComponent);
    // remove(this._tripPriceComponent);
    // remove(this._tripRouteDatesComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderPointList() {
    if (this._pointListComponent !== null || this._pointListComponent !== undefined) {
      this._pointListComponent = null;
    }

    const points = this._getPoints().slice();

    if (this._currentSortType === `sort-event`) {
      const pointsSorted = points.sort((a, b) => (a.startDate - b.startDate));
      this._pointListComponent = new PointListView(pointsSorted);
      render(this._tripContainer, this._pointListComponent, RenderPosition.BEFOREEND);

      const travelPointsListContainer = this._tripContainer.querySelectorAll(`.trip-events__list`);

      let currentDate = pointsSorted[0].startDate.getDate();
      for (let i = 0, j = 0; i < pointsSorted.length; i++) {
        if (currentDate === pointsSorted[i].startDate.getDate()) {
          this._renderPoint(travelPointsListContainer[j], pointsSorted[i]);
        } else {
          j++;
          currentDate = pointsSorted[i].startDate.getDate();
          this._renderPoint(travelPointsListContainer[j], pointsSorted[i]);
        }
      }
    }

    if (this._currentSortType !== `sort-event`) {
      this._pointListComponent = new PointListView();
      render(this._tripContainer, this._pointListComponent, RenderPosition.BEFOREEND);

      const travelPointsSortContainer = this._tripContainer.querySelector(`.trip-events__list`);

      points.forEach((point) => this._renderPoint(travelPointsSortContainer, point));
    }
  }

  _renderTripInfo() {
    const points = this._getPoints().slice();
    const pointsSorted = points.sort((a, b) => (a.startDate - b.startDate));

    if (this._tripInfoComponent !== null) {
      remove(this._tripInfoComponent);
    }
    if (this._tripPriceComponent !== null) {
      remove(this._tripPriceComponent);
    }
    if (this._tripRouteDatesComponent !== null) {
      remove(this._tripRouteDatesComponent);
    }

    this._tripInfoComponent = new TripInfoView();
    this._tripPriceComponent = new TripPriceView(pointsSorted);
    this._tripRouteDatesComponent = new TripRouteDatesView(pointsSorted);

    render(this._destinationPriceContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripRouteDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripPriceComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    const points = this._getPoints().slice();
    if (points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderTripInfo();
    this._renderSort();
    this._renderPointList();
  }
}
