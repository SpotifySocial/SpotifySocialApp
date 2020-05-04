import React, { useState, useEffect } from 'react';

import './App.scss';
import PreLogin from './components/PreLogin/PreLogin'
import Copyright from './components/Copyright/Copyright'
import MusicBuddies from './components/MusicBuddies/MusicBuddies'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'

export const App = () => {

  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    let loggedInCookie = document.cookie.match('(^|;) ?' + 'Logged_in' + '=([^;]*)(;|$)');
    let tokenCookie = document.cookie.match('(^|;) ?' + 'token' + '=([^;]*)(;|$)');
    if (loggedInCookie && tokenCookie) {
      setLoggedIn(loggedInCookie[2]);
    }
  }, [setLoggedIn]);

  return (
    <>
      { loggedIn ? (
        <>
          <div className="main-navigation">
            <MusicBuddies />
          </div>
          <div className="sidebar">
            <SocialNetwork />
          </div>
        </>
      ) : (
        <>
          <PreLogin />
          <Copyright />
        </>
      )}
    </>
  );
}

export default App;
