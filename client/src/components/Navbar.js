import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userActions";

const NavBar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        {!userInfo ? (
          <React.Fragment>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>|</li>
            <li>
              <Link to="/dashboard">
                <i className="fas fa-user"></i>{" "}
                <span className="hide-sm">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="#" onClick={logoutHandler}>
                <i className="fas fa-sign-out-alt"></i>{" "}
                <span className="hide-sm">Logout</span>
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
