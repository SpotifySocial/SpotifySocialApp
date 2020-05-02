import React, { useState } from 'react';

import './SocialNetwork.scss';
import buddies from "../../assets/buddies.png"
import buddyRequests from "../../assets/buddy-requests.png"
import addABuddy from "../../assets/add-a-buddy.png"

export const SocialNetwork = () => {
  const [users] = useState([
    { photo: 'Jane Doe photo', name: 'Jane Doe' },
    { photo: 'John Doe photo', name: 'John Doe' },
    { photo: 'Jill Byrde photo', name: 'Jill Byrde' },
  ]);
  const [ input, setInput ] = useState('');
  const [ filterDisplay, setFilterDisplay ] = useState(users);

  const handleChange = event => {
    let oldList = users.map(user => {
      return { photo: user.photo, name: user.name.toLowerCase() };
    });
    if (event !== '') {
      let newList = [];
      setInput(event);
      newList = oldList.filter(user =>
        user.name.includes(input.toLowerCase())
      );
      setFilterDisplay(newList);
    } else {
      setFilterDisplay(users);
    }
  };

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
      <input onChange={event => handleChange(event.target.value)} />
      {filterDisplay.map((user, index) => (
        <div key={index} className="social-network--users">
          <li>
            {user.photo} {user.name}
          </li>
        </div>
      ))}
    </div>
  );
}

export default SocialNetwork;
