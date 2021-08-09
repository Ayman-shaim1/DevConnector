import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import {
  addEducationToProfile,
  getCurrentUserProfile,
  resetAddEducationToProfile,
} from "../redux/profile/profileActions";



const AddEducation = ({ history }) => {
  const [school, setSchool] = React.useState("");
  const [degree, setDegree] = React.useState("");
  const [fieldofstudy, setFieldofstudy] = React.useState("");
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [current, setCurrent] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [toDateDisabled, setToDateDisabled] = React.useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileAddEducation = useSelector((state) => state.profileAddEducation);
  const { loading, error, success } = profileAddEducation;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addEducationToProfile(
        school,
        degree,
        fieldofstudy,
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

    if (success) {
      dispatch(resetAddEducationToProfile());
      dispatch(getCurrentUserProfile());
      dispatch(setAlert("Education successfully added", "success"));
      history.push("/dashboard");
    }
    if (error) {
      dispatch(resetAddEducationToProfile());
      dispatch(setAlert(error, "danger"));
    }

    if (!userInfo) {
      history.push("/");
    }
  }, [current, dispatch, error, success, history, userInfo]);
  return (
    <React.Fragment>
      {loading && <Spinner />}
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => setFieldofstudy(e.target.value)}
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
            Current School or Bootcamp
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
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </React.Fragment>
  );
};

export default AddEducation;
