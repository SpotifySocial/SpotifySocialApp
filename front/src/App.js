import React from 'react';

import './App.scss';
import PreLogin from './components/PreLogin/PreLogin'
import Copyright from './components/Copyright/Copyright'
import MusicBuddies from './components/MusicBuddies/MusicBuddies'

function App() {
  return (
    <>
      <PreLogin />
      <Copyright />
      <MusicBuddies />
    </>
  );
}

export default App;
