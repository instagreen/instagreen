import React from 'react';
import axios from 'axios';
import router from '../clientRouter.jsx';

const NavBar = () => {
  const doLogOut = () => {
    axios.get('/instagreen/logout').then((response) => {
      console.log(response);
      router.setRoute('main');
    });
  };

  return (
    <div>
      <ul className="nav">
        <li><a href="/" onClick={() => router.setRoute('main')}>Feed</a></li>
        <li><a href="/" onClick={() => router.setRoute('explore')}>Explore</a></li>
        <li><a href="/" onClick={() => router.setRoute('profile')}>Profile</a></li>
        <li><a href="#" onClick={() => router.setRoute('postCreator')}>Post</a></li>
        <li className="logout"><a href="/" onClick={() => { doLogOut(); }}> Log Out </a></li>
      </ul>
    </div>
  );
};

export default NavBar;
