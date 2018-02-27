import React from 'react';
import ReactDOM from 'react-dom';

import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';
import Feed from './feed.jsx';
<<<<<<< HEAD
import { getFeed } from './../apiCaller.js';
import Profile from './profile.jsx';
=======
import apiCaller from './../apiCaller.js';
>>>>>>> [FRONT END] added method to get username from db

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      user_id: 1,
      username: '',
    };
  }
  componentDidMount() {
    apiCaller.getUserInfo(this.state.user_id, (userInfo) => {
      this.setState({
        username: userInfo.data[0].username,
      });
    });

    apiCaller.getFeed(this.state.user_id, (response) => {
      this.setState({
        feed: response.data,
      });
    });
  }


  render() {
    return (
      <div>
        {/* navbar yet to be made */}
        {/* <Navbar /> */}
<<<<<<< HEAD
        <h1>Hello from app.jsx</h1>
        <Feed user_id={this.state.user_id} feed={this.state.feed} />
        {/* <Profile personalPosts={this.state.personalPosts} user={this.state.user} /> */}
=======
        <h1>Hello, {this.state.username}</h1>
        <Feed username={this.state.username} user_id={this.state.user_id} feed={this.state.feed} />

>>>>>>> [FRONT END] added method to get username from db
      </div>
    );
  }
}

export default App;
