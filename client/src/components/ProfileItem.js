import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={profile.user.avatar} alt="" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>
          {profile.status}
          {profile.company && <span> at {profile.company}</span>}
        </p>
        <p>{profile.location}</p>
        <br />
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {profile.skills.length !== 0 &&
          profile.skills.slice(0, 4).map((skill, index) => (
            <li className="text-primary" key={index}>
              <i className="fas fa-check"></i> {skill}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
