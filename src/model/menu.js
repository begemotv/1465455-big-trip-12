import Observer from "../utils/observer.js";
import {MenuItem} from "../const.js";

export default class Menu extends Observer {
  constructor() {
    super();
    this._selectedMenuItem = MenuItem.TABLE;
    console.log(this._selectedMenuItem)
    console.log(this._observers)
  }

  setMenuItem(UpdateType, menuItem) {
    console.log(menuItem)
    this._selectedMenuItem = menuItem;
    this._notify(UpdateType, menuItem);
  }

  getMenuItem() {
    console.log(this._selectedMenuItem)
    return this._selectedMenuItem;
  }
}