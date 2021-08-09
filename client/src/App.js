import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Alert from "./components/Alert";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateProfilePage from "./pages/CreateProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import AddExperiencePage from "./pages/AddExperiencePage";
import AddEducationPage from "./pages/AddEducationPage";
import ProfilesPage from "./pages/ProfilesPage";
import ProfilePage from "./pages/ProfilePage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={LandingPage} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/create-profile" component={CreateProfilePage} />
            <Route exact path="/edit-profile" component={EditProfilePage} />
            <Route exact path="/add-experience" component={AddExperiencePage} />
            <Route exact path="/add-education" component={AddEducationPage} />
            <Route exact path="/profiles" component={ProfilesPage} />
            <Route exact path="/profile/:id" component={ProfilePage} />
            <Route exact path="/posts" component={PostsPage} />
            <Route exact path="/post/:id" component={PostPage} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
