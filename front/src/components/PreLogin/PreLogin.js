import React from 'react';

import './PreLogin.scss';
import logo from "../../assets/logo-green.png"

function PreLogin() {
  function logIn() {
    console.log("Call backend login endpoint here");
  }

  return (
    <div className="pre-login">
      <div className="pre-login--logo">
        <img src={logo} className="pre-login--logo--icon" alt="Spotify Social logo" />
        <p className="pre-login--logo--text">Spotify Social</p>
      </div>
      <h1 className="pre-login--heading">Your Music Social Network</h1>
      <p className="pre-login--copy">
        Find your top music buddies, today’s anthem, today’s find, today’s
        surprise
      </p>
      <button
      type="button"
      className="cta--button"
      onClick={logIn}
      >
        Connect Now
      </button>
    </div>
  );
}

export default PreLogin;
