import { combineReducers } from "redux";
import { alertReducer } from "./alert/alertReducers";
import { userRegisterReducer, userLoginReducer } from "./user/userReducer";
import {
  profileCurrentUserReducer,
  profileCreateReducer,
  profileEditReducer,
  profileAddExperienceReducer,
  profileAddEducationReducer,
  profileDeleteExperienceReducer,
  profileDeleteEducationReducer,
  profileDeleteAcountReducer,
  profileGetByIdReducer,
  profileGetGitRepoReducer,
  profileGetListReducer,
} from "./profile/profileReducers";

import {
  postAddCommentReducer,
  postByIdReducer,
  postCreateReducer,
  postDeleteCommentReducer,
  postDeleteReducer,
  postLikeReducer,
  postListReducer,
  postUnlikeReducer,
} from "./post/postReducer";

const reducer = combineReducers({
  alert: alertReducer,

  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,

  profileCurrentUser: profileCurrentUserReducer,
  profileCreate: profileCreateReducer,
  profileEdit: profileEditReducer,
  profileAddExperience: profileAddExperienceReducer,
  profileAddEducation: profileAddEducationReducer,
  profileDeleteExperience: profileDeleteExperienceReducer,
  profileDeleteEducation: profileDeleteEducationReducer,
  profileDeleteAcount: profileDeleteAcountReducer,
  profileGetById: profileGetByIdReducer,
  profileGetGitRepo: profileGetGitRepoReducer,
  profileGetList: profileGetListReducer,

  postAddComment: postAddCommentReducer,
  postById: postByIdReducer,
  postCreate: postCreateReducer,
  postDeleteComment: postDeleteCommentReducer,
  postDelete: postDeleteReducer,
  postLike: postLikeReducer,
  postList: postListReducer,
  postUnlike: postUnlikeReducer,
});

export default reducer;
