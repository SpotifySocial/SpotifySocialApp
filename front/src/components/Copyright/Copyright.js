import React from 'react';
import clsx from "clsx";

import './Copyright.scss';

export const Copyright = (loggedIn) => {
  console.log("check", loggedIn);
  return (
    <div className={clsx(loggedIn ? "copyright--logged-in" : "copyright--logged-out")}>
      © 2018 Spotify AB | &nbsp;<a href="/">Privacy</a>
    </div>
  );
}

export default Copyright;
