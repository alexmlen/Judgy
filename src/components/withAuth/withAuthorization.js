import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase, db } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LOGIN);
        } else if (authUser.displayName === null) {
          var userId = authUser.uid;
          var username;
          db.onceGetUser(userId).then(function(snapshot) {
            username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            authUser.updateProfile({
              displayName: username,
              //photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(function() {
              // Update successful.
            }).catch(function(error) {
              // An error happened.
            });
          });
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component /> : null}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;