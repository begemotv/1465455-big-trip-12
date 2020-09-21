import SmartView from "./smart.js";

const generateStatsTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a 
      class="trip-tabs__btn ${selectedMenuItem === MenuItem.TABLE ? `trip-tabs__btn--active` : ``}" 
      href="#"
      data-menu="TABLE"
      >Table</a>
      <a 
      class="trip-tabs__btn ${selectedMenuItem === MenuItem.STATS ? `trip-tabs__btn--active` : ``}" 
      href="#"
      data-menu="STATS"
      >Stats</a>
     </nav>`
  );
};

export default class Stats extends SmartView {
  constructor() {
    super();

    this._menuModel = menuModel;
    this._data = menuModel.getMenuItem();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  _getTemplate() {
    console.log(`CLICK`)
    return generateStatsTemplate(this._menuModel.getMenuItem());
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A`) {
      this._menuModel.setMenuItem(evt.target.dataset.menu);
      this._data = this._menuModel.getMenuItem();
      this.updateData(this._data);
      this._callback.menuClick(evt.target.dataset.menu);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  restoreHandlers() {
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
