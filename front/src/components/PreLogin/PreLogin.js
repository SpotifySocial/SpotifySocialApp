import React from 'react';

import './PreLogin.scss';

function PreLogin() {
  function logIn() {
    console.log("Call backend login endpoint here");
  }

  return (
    <div className="pre-login">
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
