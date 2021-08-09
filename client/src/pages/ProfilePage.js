import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import {
  getByIdProfile,
  getGitRepo,
  resetGetGitRepo,
  resetGetByIdProfile,
} from "../redux/profile/profileActions";

import Spinner from "../components/Spinner";
import Moment from "react-moment";

const ProfilePage = ({ match }) => {
  const [showBtnEditProfile, setShowBtnEditProfile] = React.useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileGetById = useSelector((state) => state.profileGetById);
  const { loading, error, success, profile } = profileGetById;

  const profileGetGitRepo = useSelector((state) => state.profileGetGitRepo);
  const {
    loading: loadingGetGitRepo,
    error: errorGetGitRepo,
    success: successGetGitRepo,
    repo,
  } = profileGetGitRepo;

  React.useEffect(() => {
    if (error) {
      dispatch(setAlert(error, "danger"));
    }
    if (!profile && !success && !error) {
      dispatch(resetGetByIdProfile());
      dispatch(resetGetGitRepo());
      dispatch(getByIdProfile(match.params.id));
    }

    if (errorGetGitRepo) {
      dispatch(setAlert(errorGetGitRepo, "danger"));
    }

    if (profile) {
      if (String(match.params.id) !== String(profile.user._id)) {
        dispatch(resetGetByIdProfile());
        dispatch(resetGetGitRepo());
        dispatch(getByIdProfile(match.params.id));
      }
    }

    if (!successGetGitRepo && !errorGetGitRepo) {
      if (profile) {
        dispatch(resetGetGitRepo());
        dispatch(getGitRepo(profile.githubusername));
      }
    }

    if (userInfo && profile && userInfo._id === profile.user._id) {
      setShowBtnEditProfile(true);
    } else {
      setShowBtnEditProfile(false);
    }
  }, [
    match,
    dispatch,
    error,
    success,
    successGetGitRepo,
    errorGetGitRepo,
    profile,
    userInfo,
  ]);

  return (
    <React.Fragment>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>
      {showBtnEditProfile && (
        <Link to="/edit-profile" className="btn btn-dark">
          Edit Profile
        </Link>
      )}
      {loading && <Spinner />}
      {profile && (
        <div className="profile-grid my-1">
          <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={profile.user.avatar} alt="" />
            <h1 className="large">{profile.user.name}</h1>
            <p className="lead">
              {profile.status}{" "}
              {profile.company && <span>{profile.company}</span>}
            </p>
            <p>{profile.location}</p>
            <div className="icons my-1">
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fas fa-globe fa-2x"></i>
                </a>
              )}
              {profile.social && profile.social.twitter && (
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              )}

              {profile.social && profile.social.facebook && (
                <a
                  href={profile.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              )}

              {profile.social && profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              )}

              {profile.social && profile.social.youtube && (
                <a
                  href={profile.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-2x"></i>
                </a>
              )}

              {profile.social && profile.social.instagram && (
                <a
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              )}
            </div>
          </div>

          <div className="profile-about bg-light p-2">
            <h2 className="text-primary">
              {profile.user.name.trim().split(" ")[0]} Bio
            </h2>
            <p>{profile.bio}</p>
            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
              {profile.skills.lenght !== 0 &&
                profile.skills.map((skill, index) => (
                  <div className="p-1" key={index}>
                    <i className="fa fa-check"></i> {skill}
                  </div>
                ))}
            </div>
          </div>

          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {profile.experience.lenght !== 0 &&
              profile.experience.map((experience) => (
                <div key={experience._id}>
                  <h3 className="text-dark">{experience.company}</h3>
                  <p>
                    <Moment format="YYYY/MM/DD">{experience.from}</Moment> -
                    {experience.to ? <Moment>{experience.to}</Moment> : "Now"}
                  </p>
                  <p>
                    <strong>Position: </strong>
                    {experience.title}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {experience.description}
                  </p>
                </div>
              ))}
          </div>

          <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {profile.education.length !== 0 &&
              profile.education.map((education) => (
                <div key={education._id}>
                  <h3>{education.school}</h3>
                  <p>
                    <Moment format="YYYY/MM/DD">{education.from}</Moment> -
                    {education.to ? (
                      <Moment format="YYYY/MM/DD">{education.to}</Moment>
                    ) : (
                      "Now"
                    )}
                  </p>
                  <p>
                    <strong>Degree: </strong> {education.degree}
                  </p>
                  <p>
                    <strong>Field Of Study: </strong>
                    {education.fieldOfStudy}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {education.description}
                  </p>
                </div>
              ))}
          </div>
          <div className="profile-github">
            <h2 className="text-primary my-1">
              <i className="fab fa-github"></i> Github Repos
            </h2>
            {loadingGetGitRepo && <Spinner />}
            {repo.length !== 0 &&
              repo.map((repo, index) => (
                <div className="repo bg-white p-1 my-1" key={index}>
                  <div>
                    <h4>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </h4>
                    <p>{repo.description}</p>
                  </div>
                  <div>
                    <ul>
                      <li className="badge badge-primary">
                        Stars: {repo.stargazers_count}
                      </li>
                      <li className="badge badge-dark">
                        Watchers: {repo.watchers_count}
                      </li>
                      <li className="badge badge-light">
                        Forks: {repo.forks_count}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfilePage;
