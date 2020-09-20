import Observer from "../utils/observer.js";
import {MenuItem} from "../const.js";

export default class Menu extends Observer {
  constructor() {
    super();
    this._selectedMenuItem = MenuItem.TABLE;
  }

  setMenuItem(menuItem) {
    this._selectedMenuItem = menuItem;
    this._notify(menuItem);
  }

  getMenuItem() {
    return this._selectedMenuItem;
  }
}