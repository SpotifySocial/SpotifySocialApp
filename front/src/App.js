import React from 'react';

import './App.scss';
import PreLogin from './components/PreLogin/PreLogin'
import Copyright from './components/Copyright/Copyright'
import MusicBuddies from './components/MusicBuddies/MusicBuddies'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'

export const App = () => {
  return (
    <>
      <div className="main-navigation">
        <PreLogin />
        <Copyright />
        <MusicBuddies />
      </div>
      <div className="sidebar">
        <SocialNetwork />
      </div>
    </>
  );
}

export default App;
