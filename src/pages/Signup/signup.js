import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../../firebase';

const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
    <div>Enter a valid email and password.</div>
    <div>Passwords must be at least 8 characters.</div>
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


class CustomError extends Error {};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    var success = false;
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then((user) => {
            this.setState(() => ({ ...INITIAL_STATE }));
            if (authUser) {
              authUser.sendEmailVerification().then(function() {
                // Email sent.
                success = true;
               }, function(error) {
                // An error happened./
                this.setState(byPropKey('error', error));
               });
            }
            auth.doLogout();
            //history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
        })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    if (success) {
      const error = new CustomError();
      error.message = "Success! Please check your email to finish verification.";
      this.setState(byPropKey('error', error));
    }
    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      passwordOne.length < 8;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to="/signup">Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};