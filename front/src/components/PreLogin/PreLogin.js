import React from 'react';

import './PreLogin.scss';
import logo from "../../assets/logo-green.png"

export const PreLogin = () => {

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
      <a
      className="cta--link"
      href="http://localhost:8080/login"
      >
        Connect Now
      </a>
    </div>
  );
}

export default PreLogin;
