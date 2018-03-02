import React from 'react';
import axios from 'axios';
import router from '../clientRouter.jsx';

const NavBar = () => {
  const doLogOut = () => {
    axios.get('/instagreen/logout').then((response) => {
      console.log(response);
      router.setRoute('app');
    });
  };

  return (
    <div id="nav">
      <ul>
        <li><a href="/" onClick={() => router.setRoute('app')}>Feed</a></li>
        <li><a href="#" onClick={() => router.setRoute('explore')}>Explore</a></li>
        <li><a href="#" onClick={() => router.setRoute('profile')}>Profile</a></li>
        <li><a href="#" onClick={() => router.setRoute('postCreator')}>Post</a></li>
        <li id="logout-button"><a href="/" onClick={() => { doLogOut(); }}> Log Out </a></li>
      </ul>
    </div>
  );
};

export default NavBar;
