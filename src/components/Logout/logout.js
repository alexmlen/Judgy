import React from 'react';

import { auth } from '../../firebase';

const LogoutButton = () =>
  <button
    type="button"
    onClick={auth.doLogout}
  >
    Logout
  </button>

export default LogoutButton;