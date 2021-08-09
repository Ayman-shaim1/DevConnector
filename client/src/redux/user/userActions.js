import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "./userTypes";
import axios from "axios";
import {
  PROFILE_ADD_EDUCATION_RESET,
  PROFILE_ADD_EXPERIENCE_RESET,
  PROFILE_GET_CURRENT_RESET,
  PROFILE_CREATE_RESET,
  PROFILE_GET_GIT_REPO_RESET,
  PROFILE_GET_LIST_RESET,
  PROFILE_GET_BY_ID_RESET,
} from "../profile/profileTypes";
import {
  POST_ADD_COMMENT_RESET,
  POST_CREATE_RESET,
  POST_DELETE_COMMENT_RESET,
  POST_DELETE_RESET,
  POST_GET_BY_ID_RESET,
  POST_LIKE_RESET,
  POST_LIST_RESET,
  POST_UNLIKE_RESET,
} from "../post/postTypes";
export const register = (name, email, password) => {
  return (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post("/api/users", { name, email, password }, config)
      .then((resposne) => {
        const data = resposne.data;
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_REGISTER_FAIL, payload: err });
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post("/api/users/login", { email, password }, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_LOGIN_FAIL, payload: err });
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: PROFILE_ADD_EDUCATION_RESET });
    dispatch({ type: PROFILE_ADD_EXPERIENCE_RESET });
    dispatch({ type: PROFILE_GET_CURRENT_RESET });
    dispatch({ type: PROFILE_CREATE_RESET });
    dispatch({ type: PROFILE_GET_GIT_REPO_RESET });
    dispatch({ type: PROFILE_GET_LIST_RESET });
    dispatch({ type: PROFILE_GET_BY_ID_RESET });
    dispatch({ type: POST_UNLIKE_RESET });
    dispatch({ type: POST_LIKE_RESET });
    dispatch({ type: POST_CREATE_RESET });
    dispatch({ type: POST_LIST_RESET });
    dispatch({ type: POST_GET_BY_ID_RESET });
    dispatch({ type: POST_ADD_COMMENT_RESET });
    dispatch({ type: POST_DELETE_COMMENT_RESET });
    dispatch({ type: POST_DELETE_RESET });
  };
};
