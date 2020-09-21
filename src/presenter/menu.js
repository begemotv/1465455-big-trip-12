import MenuView from "../view/menu.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
// import {FilterType, UpdateType} from "../const.js";

export default class Menu {
  constructor(menuModel) {
    this._menuModel = menuModel;
    this._currentMenuItem = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleMenuItemChange = this._handleMenuItemChange.bind(this);

    this._menuModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentMenuItem = this._menuModel.getMenuItem();

    this._menuComponent = new MenuView(this._currentMenuItem);
    this._menuComponent.setMenuClickHandler(this._handleMenuItemChange);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleMenuItemChange(menuItem) {
    if (this._currentMenuItem === menuItem) {
      return;
    }

    this._menuModel.setMenuItem(menuItem);
  }
}
