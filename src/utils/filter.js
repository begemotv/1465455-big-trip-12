import {FilterType} from "../const.js";
import {isPointPast, isPointFuture} from "./date-time.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.startDate)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.endDate))
};
