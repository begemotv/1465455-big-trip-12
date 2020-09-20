import SmartView from "./smart.js";
import {MenuItem} from "../const.js";

const generateMenuTemplate = (selectedMenuItem) => {
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

export default class Menu extends SmartView {
  constructor(menuModel) {
    super();

    this._menuModel = menuModel;
    this._data = menuModel.getMenuItem();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  _getTemplate() {
    return generateMenuTemplate(this._data);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A`) {
      this._menuModel.setMenuItem(evt.target.dataset.menu);
      this._data = this._menuModel.getMenuItem();
      console.log(this.updateData)
      this.updateData(this._data, false);
      this._callback.menuClick(evt.target.dataset.menu);
    }
  }

  setMenuClickHandler(callback) {
    console.log(`set`)
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  restoreHandlers() {
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
