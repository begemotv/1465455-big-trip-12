import Observer from "../utils/observer.js";
import {MenuItem} from "../const.js";

export default class Menu extends Observer {
  constructor() {
    super();
    this._selectedMenuItem = MenuItem.TABLE;
  }

  setMenuItem(UpdateType, menuItem) {
    this._selectedMenuItem = menuItem;
    this._notify(UpdateType, menuItem);
  }

  getMenuItem() {
    return this._selectedMenuItem;
  }
}
