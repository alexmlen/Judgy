import React from 'react';

import { auth } from '../../firebase';
<<<<<<< HEAD

const LogoutButton = () =>
  <button
=======
import { MenuItem } from 'material-ui/Menu';

const LogoutButton = () =>
  <MenuItem
>>>>>>> master
    type="button"
    onClick={auth.doLogout}
  >
    Logout
<<<<<<< HEAD
  </button>
=======
  </MenuItem>
>>>>>>> master

export default LogoutButton;