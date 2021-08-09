import { SET_ALERT, REMOVE_ALERT } from "./alertTypes";

export const alertReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      if (state.length !== 6) {
        return [...state, payload];
      } else {
        return state;
      }
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};
