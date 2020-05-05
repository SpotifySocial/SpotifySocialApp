import React, { useState, useEffect } from 'react';

import './App.scss';
import PreLogin from './components/PreLogin/PreLogin'
import Copyright from './components/Copyright/Copyright'
import Header from './components/Header/Header'
import MusicBuddies from './components/MusicBuddies/MusicBuddies'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'

export const App = () => {

  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    let loggedInCookie = document.cookie.match('(^|;) ?' + 'logged_in' + '=([^;]*)(;|$)');
    let tokenCookie = document.cookie.match('(^|;) ?' + 'token' + '=([^;]*)(;|$)');
    if (loggedInCookie && tokenCookie) {
      setLoggedIn(loggedInCookie[2]);
    }
  }, [setLoggedIn]);

  const logOut = (logOutVal) => {
    setLoggedIn(logOutVal);
  }

  return (
    <>
      { loggedIn ? (
        <>
          <div className="main-navigation">
            <Header setLoggedOut={logOut} />
            <MusicBuddies />
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
    </>
  );
}

export default App;
