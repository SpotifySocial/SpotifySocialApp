import React from 'react';
import clsx from 'clsx';

import './Copyright.scss';

export const Copyright = (logInValue) => {
  return (
    <div className={clsx("copyright", logInValue.loggedIn && "copyright--logged-in")}>
      © 2018 Spotify AB | &nbsp;<a href="/">Privacy</a>
    </div>
  );
}

export default Copyright;
