import React, { Component } from 'react';
import logo from '../../images/logo.png';
import DefaultProfile from '../../images/profile.png';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { MenuItem } from 'material-ui/Menu';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profilePicture: "",
    };
  }
  
  render() {
    const profilePicture = this.state.profilePicture === "" ? DefaultProfile : profilePicture;

    return (
      <div className="landing">
        <img src={logo} alt="logo" className="App-logo"/>
        <p>This is the home page!</p>
        <Drawer
        variant="permanent"
        anchor="left"
        >
          <MenuItem>Welcome, User!</MenuItem>
          <Divider /> 
          <img src={profilePicture} alt="profile-picture"/>
          <Divider /> 
          <MenuItem>Account Settings</MenuItem>
          <Divider /> 
          <MenuItem>Enter Competition</MenuItem>
          <MenuItem>Judge Competition</MenuItem>
          <MenuItem>Create Competition</MenuItem>
          <Divider /> 
          <MenuItem>Report Issue</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Home;
