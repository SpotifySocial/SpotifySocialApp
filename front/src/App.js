import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import './App.scss';
import PreLogin from './components/PreLogin/PreLogin'
import Copyright from './components/Copyright/Copyright'
import Header from './components/Header/Header'
import MusicBuddies from './components/MusicBuddies/MusicBuddies'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'
import Anthem from './components/Anthem/Anthem'

export const App = () => {

  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    let loggedInCookie = document.cookie.match('(^|;) ?' + 'logged_in' + '=([^;]*)(;|$)');
    let tokenCookie = document.cookie.match('(^|;) ?' + 'token' + '=([^;]*)(;|$)');
    if (loggedInCookie && tokenCookie) {
      setLoggedIn(loggedInCookie[2]);
    }
  }, [loggedIn, setLoggedIn]);

  const logOut = (logOutVal) => {
    setLoggedIn(logOutVal);
    window.location.reload();
  }

  return (
    <div className={clsx(!loggedIn && "pre-login-main")}>
      { loggedIn ? (
        <>
          <div className="main-navigation">
            <Header setLoggedOut={logOut} />
            <MusicBuddies />
            <Anthem />
          </div>
          <div className="sidebar">
            <SocialNetwork />
          </div>
        </>
      ) : (
        <>
          <PreLogin />
        </>
      )}
      <Copyright loggedIn={loggedIn} />
    </div>
  );
}

export default App;
