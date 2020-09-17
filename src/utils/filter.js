import {FilterType} from "../const.js";
import {isEventPast, isEventFuture} from "./date-time.js";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.startDate)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.endDate))
};
