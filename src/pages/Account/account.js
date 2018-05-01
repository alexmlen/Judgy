import React from 'react';

import AuthUserContext from '../../components/withAuth/AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget/passwordForget';
import PasswordChangeForm from '../PasswordChange/passwordChange';
import withAuthorization from '../../components/withAuth/withAuthorization';
<<<<<<< HEAD

const AccountPage = () =>
=======
import Sidebar from '../../components/sidebar/sidebar';

const AccountPage = () =>
  <div className="page">
  <Sidebar />
  <div style={{flexGrow: 1}}>
>>>>>>> master
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>
<<<<<<< HEAD
=======
  </div>
  </div>
>>>>>>> master

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);