import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./alertTypes";

export const setAlert = (msg, alertType) => {
  const myuuid = uuidv4();

  const payload = {
    id: myuuid,
    msg: msg,
    alertType: alertType,
  };

  return {
    type: SET_ALERT,
    payload: payload,
  };
};

export const removeAlert = (id) => {
  return { type: REMOVE_ALERT, payload: id };
};
