import Observer from "../utils/observer.js";

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getDestinations() {
    return this._destinations;
  }

  static adaptToClient(destination) {
    const adaptedDestination = Object.assign(
        {},
        destination,
        {
          photos: destination.pictures.map((picture) => ({
            src: picture.src,
            description: picture.description,
          }))
        }
    );

    delete adaptedDestination.pictures;

    return adaptedDestination;
  }
}
