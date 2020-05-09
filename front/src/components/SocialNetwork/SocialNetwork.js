import React, { useState, useEffect } from 'react';
import axios from 'axios'
import clsx from "clsx";

import './SocialNetwork.scss';
import buddiesIcon from "../../assets/buddies.png"
import buddyRequestsIcon from "../../assets/buddy-requests.png"
import addABuddyIcon from "../../assets/add-a-buddy.png"
import searchIcon from "../../assets/search.png"

import Invite from '../Invite/Invite'

export const SocialNetwork = () => {
  const [ buddies, setBuddies ] = useState([]);
  const [ buddyRequests, setBuddyRequests ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ activeTab, setActiveTab ] = useState('buddies');
  const [ input, setInput ] = useState('');
  const [ filterDisplay, setFilterDisplay ] = useState(users);
  const [ placeholder, setPlaceholder ] = useState('Search');

  useEffect(() => {
    axios
      .get('http://localhost:8080/get/users', {withCredentials: true})
      .then(res => {
        if (res.status === 200) {
          let tempBuddyRequests = res.data.map(user => {
            return {
              displayName: user.display_name,
              spotifyUrl: user.spotifyUrl,
              imageUrl: user.images[0].url,
            };
          });
          setBuddyRequests(tempBuddyRequests);
        }
      })
      .catch(error => {
        console.log('error', error);
      })

    axios
      .get('http://localhost:8080/get/users', {withCredentials: true})
      .then(res => {
        if (res.status === 200) {
          let tempBuddies = res.data.map(user => {
            return {
              displayName: user.display_name,
              spotifyUrl: user.spotifyUrl,
              imageUrl: user.images[0].url,
            };
          });
          setBuddies(tempBuddies);
        }
      })
      .catch(error => {
        console.log('error', error);
      })

    axios
      .get('http://localhost:8080/get/users', {withCredentials: true})
      .then(res => {
        if (res.status === 200) {
          let tempUsers = res.data.map(user => {
            return {
              displayName: user.display_name,
              spotifyUrl: user.spotifyUrl,
              imageUrl: user.images[0].url,
            };
          });
          setUsers(tempUsers);
        }
      })
      .catch(error => {
        console.log('error', error);
      })
  });

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
      return { imageUrl: user.photo, displayName: user.displayName.toLowerCase() };
    });
    if (event !== '') {
      let newList = [];
      setInput(event);
      newList = oldList.filter(user =>
        user.displayName.includes(input.toLowerCase())
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
                src={user.imageUrl}
                alt={user.displayName + "'s photo"}
                className="social-network--user--icon"
              />
            <a href={user.spotifyUrl} target="blank" rel="noopener noreferrer">{user.displayName}</a>
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
