import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import withAuthentication from './components/withAuth/withAuthentication';
import LandingPage from './pages/Landing/landing';
import HomePage from './pages/Home/home';
import LoginPage from './pages/Login/login';
import SignupPage from './pages/Signup/signup';
import PasswordForgetPage from './pages/PasswordForget/passwordForget';
import AccountPage from './pages/Account/account';
import AdminPage from './pages/Admin/admin';
import CompCreation from './pages/Competition/creation';

import * as routes from './constants/routes';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path={routes.LANDING} component={LoginPage} />
            <Route exact path={routes.LOGIN} component={LoginPage} />
            <Route exact path={routes.HOME} component={HomePage} />
            <Route exact path={routes.SIGN_UP} component={SignupPage} />
            <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
            <Route exact path={routes.ADMIN} component={AdminPage} />
            <Route exact path={routes.CREATION} component={CompCreation} />
          </div>
        </Router>
      </div>
    );
  }
}

export default withAuthentication(App);
