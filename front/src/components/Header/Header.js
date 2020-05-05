import React from 'react';
import axios from 'axios'

import './Header.scss';
import logo from "../../assets/logo-green.png"
import profilePhoto from "../../assets/user-icon.png"

export const Header = ( {setLoggedOut} ) => {
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
          <p className="header--profile--name">Jen Vixen</p>
          <button className="header--profile--logout" onClick={logout}>Log out</button>
        </div>
        <img src={profilePhoto} className="header--profile--icon" alt="profile" />
      </div>
    </div>
  );
}

export default Header;
