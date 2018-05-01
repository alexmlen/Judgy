import React from 'react';

import { auth } from '../../firebase';
import { MenuItem } from 'material-ui/Menu';

const LogoutButton = () =>
  <MenuItem
    type="button"
    onClick={auth.doLogout}
  >
    Logout
  </MenuItem>

export default LogoutButton;