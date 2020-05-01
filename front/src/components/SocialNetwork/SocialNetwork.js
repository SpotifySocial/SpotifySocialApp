import React from 'react';

import './SocialNetwork.scss';
import buddies from "../../assets/buddies.png"
import buddyRequests from "../../assets/buddy-requests.png"
import addABuddy from "../../assets/add-a-buddy.png"

function SocialNetwork() {

  return (
    <div className="social-network">
      <button className="social-network--navigation">
        <img src={buddies} className="social-netowork--icon" alt="buddies"/>
        Buddies
      </button>
      <button className="social-network--navigation">
        <img src={buddyRequests} className="social-netowork--icon" alt="buddy requests"/>
        Buddy Requests
      </button>
      <button className="social-network--navigation">
        <img src={addABuddy} className="social-netowork--icon" alt="add a buddy"/>
        Add a Buddy
      </button>
      <hr />
    </div>
  );
}

export default SocialNetwork;
