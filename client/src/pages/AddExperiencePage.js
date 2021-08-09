import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addExperienceToProfile,
  getCurrentUserProfile,
  resetAddExperienceToProfile,
} from "../redux/profile/profileActions";
import { setAlert } from "../redux/alert/alertActions";

import Spinner from "../components/Spinner";
const AddExperience = ({ history }) => {
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [current, setCurrent] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [toDateDisabled, setToDateDisabled] = React.useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileAddExperience = useSelector(
    (state) => state.profileAddExperience
  );
  const { loading, error, success } = profileAddExperience;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addExperienceToProfile(
        title,
        company,
        location,
        fromDate,
        toDate,
        current,
        description
      )
    );
  };

  React.useEffect(() => {
    if (current) {
      setToDate("");
      setToDateDisabled(true);
    } else {
      setToDateDisabled(false);
    }

    if (error) {
      dispatch(resetAddExperienceToProfile());
      dispatch(setAlert(error, "danger"));
    }

    if (success) {
      dispatch(resetAddExperienceToProfile());
      dispatch(getCurrentUserProfile());
      dispatch(setAlert("Experience successfully added", "success"));
      history.push("/dashboard");
    }

    if (!userInfo) {
      history.push("/");
    }
  }, [current, userInfo, history, dispatch, error, success]);

  return (
    <React.Fragment>
      {loading && <Spinner />}
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            company={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            location={location}
            placeholder="Location"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={(e) => setCurrent(e.target.checked)}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            disabled={toDateDisabled}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="dashboard">
          Go Back
        </Link>
      </form>
    </React.Fragment>
  );
};

export default AddExperience;
