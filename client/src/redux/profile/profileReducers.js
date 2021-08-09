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
  PROFILE_GET_BY_ID_SUCCESS,
  PROFILE_GET_GIT_REPO_FAIL,
  PROFILE_GET_GIT_REPO_REQUEST,
  PROFILE_GET_GIT_REPO_SUCCESS,
  PROFILE_GET_LIST_FAIL,
  PROFILE_GET_LIST_REQUEST,
  PROFILE_GET_LIST_SUCCESS,
  PROFILE_GET_BY_ID_RESET,
  PROFILE_GET_GIT_REPO_RESET,
  PROFILE_GET_LIST_RESET,
} from "./profileTypes";

export const profileCurrentUserReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_GET_CURRENT_REQUEST:
      return { loading: true };
    case PROFILE_GET_CURRENT_SUCCESS:
      return { loading: false, userProfile: payload, success: true };
    case PROFILE_GET_CURRENT_FAIL:
      return { error: payload, loading: false };

    case PROFILE_GET_CURRENT_RESET:
      return {};
    default:
      return state;
  }
};

export const profileCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_CREATE_REQUEST:
      return { loading: true };
    case PROFILE_CREATE_SUCCESS:
      return { loading: false, success: true, userProfile: payload };
    case PROFILE_CREATE_FAIL:
      return { loading: false, error: payload };
    case PROFILE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileEditReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_EDIT_REQUEST:
      return { loading: true };
    case PROFILE_EDIT_SUCCESS:
      return { loading: false, success: true, userProfile: payload };
    case PROFILE_EDIT_FAIL:
      return { loading: false, error: payload };
    case PROFILE_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const profileAddExperienceReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_ADD_EXPERIENCE_REQUEST:
      return { loading: true };
    case PROFILE_ADD_EXPERIENCE_SUCCESS:
      return { userProfile: payload, success: true };
    case PROFILE_ADD_EXPERIENCE_FAIL:
      return { error: payload };
    case PROFILE_ADD_EXPERIENCE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileAddEducationReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_ADD_EDUCATION_REQUEST:
      return { loading: true };
    case PROFILE_ADD_EDUCATION_SUCCESS:
      return { userProfile: payload, success: true };
    case PROFILE_ADD_EDUCATION_FAIL:
      return { error: payload };
    case PROFILE_ADD_EDUCATION_RESET:
      return {};
    default:
      return state;
  }
};

export const profileDeleteExperienceReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_DELETE_EXPERIENCE_REQUEST:
      return { loading: true };
    case PROFILE_DELETE_EXPERIENCE_SUCCESS:
      return { success: true, userProfile: payload };
    case PROFILE_DELETE_EXPERIENCE_FAIL:
      return { error: payload };
    case PROFILE_DELETE_EXPERIENCE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileDeleteEducationReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_DELETE_EDUCATION_REQUEST:
      return { loading: true };
    case PROFILE_DELETE_EDUCATION_SUCCESS:
      return { success: true, userProfile: payload };
    case PROFILE_DELETE_EDUCATION_FAIL:
      return { error: payload };
    case PROFILE_DELETE_EDUCATION_RESET:
      return {};
    default:
      return state;
  }
};

export const profileDeleteAcountReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_DELETE_ACCOUNT_REQUEST:
      return { loading: true };
    case PROFILE_DELETE_ACCOUNT_SUCCESS:
      return { success: true, message: payload };
    case PROFILE_DELETE_ACCOUNT_FAIL:
      return { error: payload };
    case PROFILE_DELETE_ACCOUNT_RESET:
      return {};
    default:
      return state;
  }
};

export const profileGetListReducer = (state = { profiles: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_GET_LIST_REQUEST:
      return { loading: true, profiles: [] };
    case PROFILE_GET_LIST_SUCCESS:
      return { success: true, profiles: payload };
    case PROFILE_GET_LIST_FAIL:
      return { error: payload, profiles: [] };
    case PROFILE_GET_LIST_RESET:
      return { profiles: [] };
    default:
      return state;
  }
};

export const profileGetByIdReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_GET_BY_ID_REQUEST:
      return { loading: true };
    case PROFILE_GET_BY_ID_SUCCESS:
      return { success: true, profile: payload };
    case PROFILE_GET_BY_ID_FAIL:
      return { error: payload };
    case PROFILE_GET_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const profileGetGitRepoReducer = (state = { repo: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_GET_GIT_REPO_REQUEST:
      return { loading: true, repo: [] };
    case PROFILE_GET_GIT_REPO_SUCCESS:
      return { success: true, repo: payload };
    case PROFILE_GET_GIT_REPO_FAIL:
      return { error: payload, repo: [] };
    case PROFILE_GET_GIT_REPO_RESET:
      return { repo: [] };
    default:
      return state;
  }
};
