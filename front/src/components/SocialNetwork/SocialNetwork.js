import React, { useState } from 'react';
import clsx from "clsx";

import './SocialNetwork.scss';
import buddiesIcon from "../../assets/buddies.png"
import buddyRequestsIcon from "../../assets/buddy-requests.png"
import addABuddyIcon from "../../assets/add-a-buddy.png"
import searchIcon from "../../assets/search.png"
import userIcon from "../../assets/user-icon.png"

export const SocialNetwork = () => {
  const [users] = useState([
    { photo: "add absolute image url here", name: 'Jane Doe' },
    { photo: "add absolute image url here", name: 'John Doe' },
    { photo: "add absolute image url here", name: 'Jill Byrde' },
  ]);
  const [buddies] = useState([
    { photo: '/static/media/user-icon.74583f9b.png', name: 'Jane Doe' },
  ]);
  const [buddieRequests] = useState([
    { photo: '/static/media/user-icon.74583f9b.png', name: 'Jill Byrde' },
  ]);
  const [ activeTab, setActiveTab ] = useState('buddies');
  const [ input, setInput ] = useState('');
  const [ filterDisplay, setFilterDisplay ] = useState(users);

  const changeToUsers = () => {
    setActiveTab('users');
    setFilterDisplay(users);
  }
  const changeToBuddies = () => {
    setActiveTab('buddies');
    setFilterDisplay(buddies);
  }
  const changeToBuddyRequests = () => {
    setActiveTab('buddyRequests');
    setFilterDisplay(buddieRequests);
  }

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
      <button
        className={clsx("social-network--navigation",
              activeTab === 'buddies' ?
              "social-network--navigation--selected" : null
        )}
        onClick={changeToBuddies}
      >
        <img src={buddiesIcon} className="social-netowork--icon" alt="buddies"/>
        Buddies
      </button>
      <button
        className={clsx("social-network--navigation",
              activeTab === 'buddyRequests' ?
              "social-network--navigation--selected" : null
        )}
        onClick={changeToBuddyRequests}
      >
        <img src={buddyRequestsIcon} className="social-netowork--icon" alt="buddy requests"/>
        Buddy Requests
      </button>
      <button
        className={clsx("social-network--navigation",
              activeTab === 'users' ?
              "social-network--navigation--selected" : null
        )}
        onClick={changeToUsers}
      >
        <img src={addABuddyIcon} className="social-netowork--icon" alt="add a buddy"/>
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
                src={userIcon}
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
