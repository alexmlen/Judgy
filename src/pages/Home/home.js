import React, { Component } from 'react';
import logo from '../../images/logo.png';
<<<<<<< HEAD
import DefaultProfile from '../../images/profile.png';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { MenuItem } from 'material-ui/Menu';
import SignOutButton from '../..//components/Logout/logout';

import withAuthorization from '../../components/withAuth/withAuthorization';
=======
import Sidebar from '../../components/sidebar/sidebar';

import AuthUserContext from '../../components/withAuth/AuthUserContext';
import withAuthorization from '../../components/withAuth/withAuthorization';
import { db } from '../../firebase';
>>>>>>> master

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< HEAD
=======
      users: null,
>>>>>>> master
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }
  
  render() {
    const { users } = this.state;

    return (
      <div className="page-centered">
        <Sidebar/>
        <div style={{flexGrow: 1}}>
        <img src={logo} alt="logo" className="App-logo"/>
        <p>This is the home page!</p>
<<<<<<< HEAD
        <p>The Home Page is accessible by every signed in user.</p>
        <Drawer
        variant="permanent"
        anchor="left"
        >
          <MenuItem>Welcome, User!</MenuItem>
          <Divider /> 
          <img src={DefaultProfile} alt="profile"/>
          <Divider /> 
          <MenuItem>Account Settings</MenuItem>
          <Divider /> 
          <MenuItem>Enter Competition</MenuItem>
          <MenuItem>Judge Competition</MenuItem>
          <MenuItem>Create Competition</MenuItem>
          <Divider /> 
          <MenuItem>Report Issue</MenuItem>
          <li><SignOutButton /></li>
        </Drawer>
=======
        <p>{}</p>
        <p>The Home Page is accessible by every signed in user.</p>
        { !!users && <UserList users={users} /> }
        </div>
>>>>>>> master
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Home);

