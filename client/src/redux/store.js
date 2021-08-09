import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./index";

// Get data from localstorage :
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
// const userProfileFromStorage = localStorage.getItem("userProfile")
//   ? JSON.parse(localStorage.getItem("userProfile"))
//   : null;

// Initial state :
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  // profileCreate: { userProfile: userProfileFromStorage },
};
// Create Store :
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
