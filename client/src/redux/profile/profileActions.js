import axios from "axios";
import {
  PROFILE_GET_CURRENT_FAIL,
  PROFILE_GET_CURRENT_SUCCESS,
  PROFILE_GET_CURRENT_REQUEST,
  PROFILE_GET_CURRENT_RESET,
  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_SUCCESS,
  PROFILE_CREATE_FAIL,
  PROFILE_CREATE_RESET,
  PROFILE_EDIT_FAIL,
  PROFILE_EDIT_REQUEST,
  PROFILE_EDIT_RESET,
  PROFILE_EDIT_SUCCESS,
  PROFILE_ADD_EXPERIENCE_FAIL,
  PROFILE_ADD_EXPERIENCE_REQUEST,
  PROFILE_ADD_EXPERIENCE_RESET,
  PROFILE_ADD_EXPERIENCE_SUCCESS,
  PROFILE_ADD_EDUCATION_FAIL,
  PROFILE_ADD_EDUCATION_REQUEST,
  PROFILE_ADD_EDUCATION_RESET,
  PROFILE_ADD_EDUCATION_SUCCESS,
  PROFILE_DELETE_EDUCATION_FAIL,
  PROFILE_DELETE_EDUCATION_REQUEST,
  PROFILE_DELETE_EDUCATION_RESET,
  PROFILE_DELETE_EDUCATION_SUCCESS,
  PROFILE_DELETE_EXPERIENCE_FAIL,
  PROFILE_DELETE_EXPERIENCE_REQUEST,
  PROFILE_DELETE_EXPERIENCE_RESET,
  PROFILE_DELETE_EXPERIENCE_SUCCESS,
  PROFILE_DELETE_ACCOUNT_FAIL,
  PROFILE_DELETE_ACCOUNT_REQUEST,
  PROFILE_DELETE_ACCOUNT_RESET,
  PROFILE_DELETE_ACCOUNT_SUCCESS,
  PROFILE_GET_BY_ID_FAIL,
  PROFILE_GET_BY_ID_REQUEST,
  PROFILE_GET_BY_ID_RESET,
  PROFILE_GET_BY_ID_SUCCESS,
  PROFILE_GET_GIT_REPO_FAIL,
  PROFILE_GET_GIT_REPO_REQUEST,
  PROFILE_GET_GIT_REPO_RESET,
  PROFILE_GET_GIT_REPO_SUCCESS,
  PROFILE_GET_LIST_FAIL,
  PROFILE_GET_LIST_REQUEST,
  PROFILE_GET_LIST_RESET,
  PROFILE_GET_LIST_SUCCESS,
} from "./profileTypes";

export const getCurrentUserProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_GET_CURRENT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token} `,
        },
      };
      const { data } = await axios.get("/api/profiles/me", config);
      dispatch({ type: PROFILE_GET_CURRENT_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_GET_CURRENT_FAIL, payload: err });
    }
  };
};

export const resetGetCurrentUserProfile = () => {
  return { type: PROFILE_GET_CURRENT_RESET };
};

export const createProfile = (
  status,
  company,
  website,
  skills,
  location,
  bio,
  githubusername,
  facebook,
  instagram,
  youtube,
  twitter,
  linkedin
) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token} `,
        },
      };
      const dataToSend = {
        status,
        company,
        website,
        skills,
        location,
        bio,
        githubusername,
        facebook,
        instagram,
        youtube,
        twitter,
        linkedin,
      };

      const { data } = await axios.post("/api/profiles", dataToSend, config);
      dispatch({ type: PROFILE_CREATE_SUCCESS, payload: data });
      // localStorage.setItem("userProfile", JSON.stringify(data));
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_CREATE_FAIL, payload: err });
    }
  };
};

export const resetCreateProfile = () => {
  return { type: PROFILE_CREATE_RESET };
};

export const editProfile = (
  status,
  company,
  website,
  skills,
  location,
  bio,
  githubusername,
  facebook,
  instagram,
  youtube,
  twitter,
  linkedin
) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_EDIT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token} `,
        },
      };
      const dataToSend = {
        status,
        company,
        website,
        skills,
        location,
        bio,
        githubusername,
        facebook,
        instagram,
        youtube,
        twitter,
        linkedin,
      };

      const { data } = await axios.post("/api/profiles", dataToSend, config);
      dispatch({ type: PROFILE_EDIT_SUCCESS, payload: data });
      // localStorage.setItem("userProfile", JSON.stringify(data));
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_EDIT_FAIL, payload: err });
    }
  };
};

export const resetEditProfile = () => {
  return { type: PROFILE_EDIT_RESET };
};

export const addExperienceToProfile = (
  title,
  company,
  location,
  fromDate,
  toDate,
  current,
  description
) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_ADD_EXPERIENCE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token} `,
        },
      };
      const dataToSend = {
        title,
        company,
        location,
        from: fromDate,
        to: toDate,
        current,
        description,
      };

      const { data } = await axios.put(
        "/api/profiles/experience",
        dataToSend,
        config
      );
      dispatch({ type: PROFILE_ADD_EXPERIENCE_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_ADD_EXPERIENCE_FAIL, payload: err });
    }
  };
};

export const resetAddExperienceToProfile = () => {
  return { type: PROFILE_ADD_EXPERIENCE_RESET };
};

export const addEducationToProfile = (
  school,
  degree,
  fieldofstudy,
  fromDate,
  toDate,
  current,
  description
) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_ADD_EDUCATION_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token} `,
        },
      };
      const dataToSend = {
        school,
        degree,
        fieldofstudy,
        from: fromDate,
        to: toDate,
        current,
        description,
      };

      const { data } = await axios.put(
        "/api/profiles/education",
        dataToSend,
        config
      );
      dispatch({ type: PROFILE_ADD_EDUCATION_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_ADD_EDUCATION_FAIL, payload: err });
    }
  };
};

export const resetAddEducationToProfile = () => {
  return { type: PROFILE_ADD_EDUCATION_RESET };
};

export const removeEducationFromProfile = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_DELETE_EDUCATION_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token} `,
        },
      };

      const { data } = await axios.delete(
        `/api/profiles/education/${id}`,
        config
      );
      dispatch({ type: PROFILE_DELETE_EDUCATION_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_DELETE_EDUCATION_FAIL, payload: err });
    }
  };
};

export const resetRemoveEducationFromProfile = () => {
  return { type: PROFILE_DELETE_EDUCATION_RESET };
};

export const removeExperienceFromProfile = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_DELETE_EXPERIENCE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token} `,
        },
      };

      const { data } = await axios.delete(
        `/api/profiles/experience/${id}`,
        config
      );
      dispatch({ type: PROFILE_DELETE_EXPERIENCE_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_DELETE_EXPERIENCE_FAIL, payload: err });
    }
  };
};

export const resetRemoveExperienceFromProfile = () => {
  return { type: PROFILE_DELETE_EXPERIENCE_RESET };
};

export const removeProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROFILE_DELETE_ACCOUNT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token} `,
        },
      };

      const { data } = await axios.delete(`/api/profiles`, config);
      dispatch({ type: PROFILE_DELETE_ACCOUNT_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_DELETE_ACCOUNT_FAIL, payload: err });
    }
  };
};

export const resetRemoveProfile = () => {
  return { type: PROFILE_DELETE_ACCOUNT_RESET };
};

export const getListProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_GET_LIST_REQUEST });
      const { data } = await axios.get("/api/profiles/");
      dispatch({ type: PROFILE_GET_LIST_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_GET_LIST_FAIL, payload: err });
    }
  };
};

export const resetGetListProfile = () => {
  return { type: PROFILE_GET_LIST_RESET };
};

export const getByIdProfile = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_GET_BY_ID_REQUEST });
      const { data } = await axios.get(`/api/profiles/${id}`);
      dispatch({ type: PROFILE_GET_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_GET_BY_ID_FAIL, payload: err });
    }
  };
};

export const resetGetByIdProfile = () => {
  return { type: PROFILE_GET_BY_ID_RESET };
};

export const getGitRepo = (username) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_GET_GIT_REPO_REQUEST });
      const { data } = await axios.get(`/api/profiles/github/${username}`);
      dispatch({ type: PROFILE_GET_GIT_REPO_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROFILE_GET_GIT_REPO_FAIL, payload: err });
    }
  };
};

export const resetGetGitRepo = () => {
  return { type: PROFILE_GET_GIT_REPO_RESET };
};
