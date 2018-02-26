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
      user_id: 0,
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
