import React from 'react';
import ReactDOM from 'react-dom';

import Feed from './feed.jsx';
import apiCaller from './../apiCaller.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      user_id: this.props.user_id,
      username: '',
    };
  }
  componentDidMount() {
    apiCaller.getUserInfo(this.state.user_id, (userInfo) => {
      this.setState({
        username: userInfo.data[0].username,
        user_id: userInfo.data[0].id,
      });
    });

    apiCaller.getFeed(this.state.user_id, (response) => {
      this.setState({
        feed: response.data,
      });
    });
  }

  render() {
    console.log('---PROPS.USER_ID from APP!!!---', this.props.user_id);
    return (
      <div>
        <Feed username={this.state.username} user_id={this.state.user_id} feed={this.state.feed} />
      </div>
    );
  }
}

export default App;
