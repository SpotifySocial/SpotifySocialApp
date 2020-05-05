import React, { useState } from 'react';
import clsx from "clsx";

import './SocialNetwork.scss';
import buddiesIcon from "../../assets/buddies.png"
import buddyRequestsIcon from "../../assets/buddy-requests.png"
import addABuddyIcon from "../../assets/add-a-buddy.png"
import searchIcon from "../../assets/search.png"
import userIcon from "../../assets/user-icon.png"

import Invite from '../Invite/Invite'

export const SocialNetwork = () => {
  const [users] = useState([
    { photo: 'add absolute image url here', name: 'Jane Doe' },
    { photo: 'add absolute image url here', name: 'John Doe' },
    { photo: 'add absolute image url here', name: 'Jill Byrde' },
  ]);
  const [buddies] = useState([
    { photo: 'add absolute image url here', name: 'Jane Doe' },
  ]);
  const [buddyRequests] = useState([
    { photo: 'add absolute image url here', name: 'Jill Byrde' },
  ]);
  const [ activeTab, setActiveTab ] = useState('buddies');
  const [ input, setInput ] = useState('');
  const [ filterDisplay, setFilterDisplay ] = useState(users);
  const [ placeholder, setPlaceholder ] = useState('Search');

  const changeToUsers = () => {
    setActiveTab('users');
    setFilterDisplay(users);
    setPlaceholder('Find Buddies');
  }
  const changeToBuddies = () => {
    setActiveTab('buddies');
    setFilterDisplay(buddies);
    setPlaceholder('Search');
  }
  const changeToBuddyRequests = () => {
    setActiveTab('buddyRequests');
    setFilterDisplay(buddyRequests);
  }

  const handleChange = event => {
    let activeUsers = activeTab === 'buddies' ? buddies : users;
    let oldList = activeUsers.map(user => {
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
      setFilterDisplay(activeUsers);
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
      { activeTab === 'buddyRequests' ?
        null
        : (
          <div className="social-network--search">
            <img src={searchIcon} className="social-network--search--icon" alt="Search Icon"/>
            <input
              onChange={event => handleChange(event.target.value)}
              className="social-network--input"
              placeholder={placeholder}
            />
          </div>
        )}
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
              { activeTab === 'users' ? (
                <button
                  className="social-network--secondary social-network--spacer"
                >
                  Add
                </button>
              ) : null }
              { activeTab === 'buddyRequests' ? (
                <>
                  <button className="social-network--primary ">Yay</button>
                  <button className="social-network--secondary">Nay</button>
               </>
             ) : null }
            </li>
          </div>
        ))}
      </ul>
      <Invite />
    </div>
  );
}

export default SocialNetwork;
