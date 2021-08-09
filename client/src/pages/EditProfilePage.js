import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import {
  editProfile,
  getCurrentUserProfile,
  resetEditProfile,
  resetGetCurrentUserProfile,
} from "../redux/profile/profileActions";
import Spinner from "../components/Spinner";

const EditProfile = ({ history }) => {
  const [status, setStatus] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [skills, setSkills] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [githubusername, setGithubusername] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [instagram, setInstagram] = React.useState("");
  const [youtube, setYoutube] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [displaySocialNInputs, setDisplaySocialNInputs] = React.useState(false);

  const dispatch = useDispatch();

  const profileEdit = useSelector((state) => state.profileEdit);
  const { loading, success, error } = profileEdit;

  const profileCurrentUser = useSelector((state) => state.profileCurrentUser);
  const {
    userProfile: currentUserProfile,
    success: successCurrentUserProfile,
  } = profileCurrentUser;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProfile(
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
      )
    );
  };

  React.useEffect(() => {
    if (success) {
      dispatch(resetEditProfile());
      dispatch(resetGetCurrentUserProfile());
      history.push("/dashboard");
      dispatch(setAlert("Profile changed successfully ", "success"));
    }
    if (error) {
      dispatch(setAlert(error, "danger"));
    }

    if (!successCurrentUserProfile) {
      dispatch(getCurrentUserProfile());
    }
    if (!currentUserProfile) {
      dispatch(setAlert("You have to create a profile before", "primary"));
      history.push("/dashboard");
    } else {
      setStatus(currentUserProfile.status);
      setWebsite(currentUserProfile.website);
      setCompany(currentUserProfile.company);
      setSkills(currentUserProfile.skills.toString());
      setLocation(currentUserProfile.location);
      setBio(currentUserProfile.bio);
      setGithubusername(currentUserProfile.githubusername);
      setFacebook(currentUserProfile.social.facebook);
      setInstagram(currentUserProfile.social.instagram);
      setYoutube(currentUserProfile.social.youtube);
      setTwitter(currentUserProfile.social.twitter);
      setLinkedin(currentUserProfile.social.linkedin);
    }
  }, [
    success,
    error,
    successCurrentUserProfile,
    currentUserProfile,
    dispatch,
    history,
  ]);

  return (
    <React.Fragment>
      {loading && <Spinner />}
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> change your information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => setGithubusername(e.target.value)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setDisplaySocialNInputs(!displaySocialNInputs)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialNInputs && (
          <React.Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
          </React.Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </React.Fragment>
  );
};

export default EditProfile;
