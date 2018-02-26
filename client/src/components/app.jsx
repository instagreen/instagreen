import React from 'react';
import ReactDOM from 'react-dom';

import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';
import Feed from './feed.jsx';
import { getFeed } from './../apiCaller.js';
import Profile from './profile.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      // changed user_id to user cause we need to have the profile picture and bio passed to
      // profile as appose to making another api call to get them
      // user_id: 0,
      user: null,
      // user: {
      //   username: 'Arnold',
      //   profile_picture: 'http://cdn.wegotthiscovered.com/wp-content/uploads/terminator-5-schwarzenegger-img.jpg',
      //   bio: 'Are we in antartica? im freezing to death',
      //   followers_count: 200,
      //   following_count: 150,

      // },
      personalPosts : [],
    };
  }
  componentDidMount() {
    // uncomment the following function to get the feed

    // getFeed(this.state.user_id, (feed) => {
    //   this.setState({ feed: [...this.state.feed, ...feed]});
    // });
  }


  render() {
    return (
      <div>
        {/* navbar yet to be made */}
        {/* <Navbar /> */}
        <h1>Hello from app.jsx</h1>
        <Feed user_id={this.state.user_id} feed={this.state.feed} />
        {/* <Profile personalPosts={this.state.personalPosts} user={this.state.user} /> */}
      </div>
    );
  }
}

export default App;
