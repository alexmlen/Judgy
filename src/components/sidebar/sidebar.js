import React from 'react';
import Divider from 'material-ui/Divider';
import { MenuItem } from 'material-ui/Menu';
import SignOutButton from '../Logout/logout';
import AuthUserContext from '../withAuth/AuthUserContext';
import DefaultProfile from '../../images/profile.png';
import { withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

var bar = {
  height: "100%",
  minHeight: "100vh",
  width: "11em",
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "rgb(224,224,224)",
  textAlign: "center",
}

const sidebar = ({ history }) =>
<div style={bar}>
    <MenuItem>
    <AuthUserContext.Consumer>
      {authUser =>
          <p>{authUser.displayName}</p>
      }
    </AuthUserContext.Consumer>
    </MenuItem>
    <Divider />
    <img src={DefaultProfile} alt="profile"/>
    <Divider />
    <MenuItem onClick={event => history.push(routes.HOME)}>Home</MenuItem>
    <Divider />
    <MenuItem onClick={event => history.push(routes.HOME)}>Enter Competition</MenuItem>
    <MenuItem onClick={event => history.push(routes.HOME)}>Judge Competition</MenuItem>
    <MenuItem onClick={event => history.push(routes.CREATION)}>Create Competition</MenuItem>
    <Divider />
    <MenuItem onClick={event => history.push(routes.ACCOUNT)}>Settings</MenuItem>
    <MenuItem>Report Issue</MenuItem>
    <SignOutButton />
</div>

export default withRouter(sidebar);
