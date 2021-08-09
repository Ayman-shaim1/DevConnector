import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import {
  getListProfile,
  resetGetListProfile,
} from "../redux/profile/profileActions";

import Spinner from "../components/Spinner";
import ProfileItem from "../components/ProfileItem";

const ProfilesPage = () => {
  const dispatch = useDispatch();
  const profileGetList = useSelector((state) => state.profileGetList);
  const { loading, error, profiles, success } = profileGetList;

  React.useEffect(() => {
    if (error) {
      dispatch(setAlert(error, "danger"));
    }
    if (!success && !error) {
      dispatch(resetGetListProfile());
      dispatch(getListProfile());
    }
  }, [dispatch, error, success]);
  return (
    <React.Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {loading && <Spinner />}
        {profiles &&
          profiles.length !== 0 &&
          profiles.map((profile, index) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
      </div>
    </React.Fragment>
  );
};

export default ProfilesPage;
