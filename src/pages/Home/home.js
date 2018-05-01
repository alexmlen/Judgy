import React, { Component } from 'react';
import logo from '../../images/logo.png';
import Sidebar from '../../components/sidebar/sidebar';

import AuthUserContext from '../../components/withAuth/AuthUserContext';
import withAuthorization from '../../components/withAuth/withAuthorization';
import { db } from '../../firebase';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
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
        <p>{}</p>
        <p>The Home Page is accessible by every signed in user.</p>
        { !!users && <UserList users={users} /> }
        </div>
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

