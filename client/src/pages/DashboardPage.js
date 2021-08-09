import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  getCurrentUserProfile,
  removeEducationFromProfile,
  removeExperienceFromProfile,
  resetRemoveEducationFromProfile,
  resetRemoveExperienceFromProfile,
  removeProfile,
  resetRemoveProfile,
} from "../redux/profile/profileActions";
import { logout } from "../redux/user/userActions";
import { setAlert } from "../redux/alert/alertActions";

const Dashboard = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileCurrentUser = useSelector((state) => state.profileCurrentUser);
  const { error, loading, success, userProfile } = profileCurrentUser;

  const profileDeleteExperience = useSelector(
    (state) => state.profileDeleteExperience
  );

  const {
    error: errorDeleteExperience,
    success: successDeleteExperience,
    loading: loadingDeleteExperience,
  } = profileDeleteExperience;

  const profileDeleteEducation = useSelector(
    (state) => state.profileDeleteEducation
  );

  const {
    error: errorDeleteEducation,
    success: successDeleteEducation,
    loading: loadingDeleteEducation,
  } = profileDeleteEducation;

  const profileDeleteAcount = useSelector((state) => state.profileDeleteAcount);
  const {
    error: errorDeleteAcount,
    success: successDeleteAcount,
    loading: loadingDeleteAcount,
  } = profileDeleteAcount;

  const dispatch = useDispatch();

  const removeExperienceHandler = (id) => {
    dispatch(removeExperienceFromProfile(id));
  };

  const removeEducationHandler = (id) => {
    dispatch(removeEducationFromProfile(id));
  };

  const removeAccountHandler = () => {
    dispatch(removeProfile());
  };

  React.useEffect(() => {
    if (!error && !success) {
      dispatch(getCurrentUserProfile());
    }

    if (successDeleteExperience) {
      dispatch(resetRemoveExperienceFromProfile());
      dispatch(getCurrentUserProfile());
      dispatch(setAlert("Experience Deleted successfully", "success"));
    }

    if (successDeleteEducation) {
      dispatch(resetRemoveEducationFromProfile());
      dispatch(getCurrentUserProfile());
      dispatch(setAlert("Education Deleted successfully", "success"));
    }

    if (errorDeleteEducation) {
      dispatch(resetRemoveEducationFromProfile());
      dispatch(setAlert(errorDeleteEducation, "danger"));
    }
    if (errorDeleteExperience) {
      dispatch(resetRemoveExperienceFromProfile());
      dispatch(setAlert(errorDeleteExperience, "danger"));
    }

    if (errorDeleteAcount) {
      dispatch(resetRemoveProfile());
      dispatch(setAlert(errorDeleteAcount, "danger"));
    }

    if (successDeleteAcount) {
      dispatch(removeProfile());
      dispatch(logout());
    }

    if (!userInfo) {
      history.push("/");
    }
  }, [
    userInfo,
    history,
    dispatch,
    error,
    success,
    errorDeleteEducation,
    errorDeleteExperience,
    successDeleteEducation,
    successDeleteExperience,
    errorDeleteAcount,
    successDeleteAcount,
  ]);

  return (
    <React.Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {userInfo && userInfo.name}
      </p>

      {loading ? (
        <Spinner />
      ) : userProfile ? (
        <React.Fragment>
          <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
              <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
              <i className="fas fa-graduation-cap text-primary"></i> Add
              Education
            </Link>
          </div>
          {loadingDeleteExperience && <Spinner />}
          {loadingDeleteEducation && <Spinner />}
          {loadingDeleteAcount && <Spinner />}
          <h2 className="my-2">Experience Credentials</h2>
          {userProfile && userProfile.experience.length !== 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th className="hide-sm">Title</th>
                  <th className="hide-sm">Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userProfile.experience.map((experience, i) => (
                  <tr key={i}>
                    <td>{experience.company}</td>
                    <td className="hide-sm">{experience.title}</td>
                    <td className="hide-sm">
                      <Moment format="YYYY-MM-DD">{experience.from}</Moment>-{" "}
                      {experience.to ? (
                        <Moment format="YYYY-MM-DD">{experience.to}</Moment>
                      ) : (
                        "Now"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeExperienceHandler(experience._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1>
              You don't have any expereince , please try to add someone of your
              expereinces
            </h1>
          )}

          <h2 className="my-2">Education Credentials</h2>
          {userProfile && userProfile.education.length !== 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>School</th>
                  <th className="hide-sm">Degree</th>
                  <th className="hide-sm">Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {userProfile.education.map((education, i) => (
                  <tr key={i}>
                    <td>{education.school}</td>
                    <td className="hide-sm">{education.degree}</td>
                    <td className="hide-sm">
                      <Moment format="YYYY-MM-DD">{education.from}</Moment> -{" "}
                      {education.to ? (
                        <Moment format="YYYY-MM-DD">{education.to}</Moment>
                      ) : (
                        "Now"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeEducationHandler(education._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1>
              You don't have any education , please try to add someone of your
              educations
            </h1>
          )}

          <div className="my-2">
            <button className="btn btn-danger" onClick={removeAccountHandler}>
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1>You have not yet setup a profile, please add some info </h1>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
