import React, { useState } from 'react';

import './SocialNetwork.scss';
import buddies from "../../assets/buddies.png"
import buddyRequests from "../../assets/buddy-requests.png"
import addABuddy from "../../assets/add-a-buddy.png"
import searchIcon from "../../assets/search.png"

export const SocialNetwork = () => {
  const [users] = useState([
    { photo: '/static/media/user-icon.74583f9b.png', name: 'Jane Doe' },
    { photo: '/static/media/user-icon.74583f9b.png', name: 'John Doe' },
    { photo: '/static/media/user-icon.74583f9b.png', name: 'Jill Byrde' },
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
      <div className="social-network--search">
        <img src={searchIcon} className="social-network--search--icon" alt="Search Icon"/>
        <input
          onChange={event => handleChange(event.target.value)}
          className="social-network--input"
          placeholder="Search"
        />
      </div>
      <ul className="social-network--users">
        {filterDisplay.map((user, index) => (
          <div key={index}>
            <li className="social-network--user">
              <img
                src={user.photo}
                alt={user.name + "'s photo"}
                className="social-network--user--icon"
              />
              {user.name}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SocialNetwork;
