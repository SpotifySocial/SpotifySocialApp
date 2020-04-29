import React from 'react';

import './SocialNetwork.scss';

function SocialNetwork() {

  return (
    <div className="social-network">
      <button className="social-network--navigation">Buddies</button>
      <button className="social-network--navigation">Buddy Requests</button>
      <button className="social-network--navigation">Add a Buddy</button>
      <hr />
    </div>
  );
}

export default SocialNetwork;
