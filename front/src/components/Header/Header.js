import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Header.scss';
import logo from "../../assets/logo-green.png"
import profilePhoto from "../../assets/user-icon.png"

export const Header = ( {setLoggedOut} ) => {

  const [ profile, setProfile ] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:8080/profile', {withCredentials: true})
      .then(res => {
        if (res.status === 200) {
          setProfile({
            displayName : res.data.display_name,
            spotifyUrl: res.data.spotifyUrl,
            imageUrl: res.data.images[0].url
          });
        }
      })
      .catch(error => {
        console.log('error', error);
      })
  });

  const logout = () => {
    axios
      .get('http://localhost:8080/logout', {withCredentials: true})
      .then(res => {
        if (res.status === 200) {
          setLoggedOut(false);
        }
      })
      .catch(error => {
        console.log('error', error);
      })
  }
  return (
    <div className="header">
      <div className="header--logo">
        <img src={logo} className="header--logo--icon" alt="Spotify Social logo" />
        <p className="header--logo--text">Spotify Social</p>
      </div>
      <div className="header--profile">
        <div className="header--profile--text">
          <a
            className="header--profile--name"
            href={profile.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.displayName}
          </a> <br />
          <button className="header--profile--logout" onClick={logout}>Log out</button>
        </div>
        <img src={profile.imageUrl} className="header--profile--icon" alt="profile" />
      </div>
    </div>
  );
}

export default Header;
