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

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/pw-forget" component={PasswordForgetPage} />
            <Route exact path="/account" component={AccountPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default withAuthentication(App);
