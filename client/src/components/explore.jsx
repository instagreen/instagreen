import React from 'react';
import Post from './post.jsx';
import apiCaller from '../apiCaller.js';

class Explore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exploreFeed: [],
      userInfo: {},
    };
  }

  componentWillMount() {
    apiCaller.getUserInfo(this.props.user_id, (userInfo) => {
      const userPayload = userInfo.data[0];
      this.setState({
        userInfo: userPayload,
      });
      apiCaller.getExploreFeed((feed) => {
        const temp = feed.data.filter(post => userPayload.id !== post.user_id);
        this.setState({ exploreFeed: temp.reverse() });
      });
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Hello, {this.state.userInfo.username}</h1>
        {this.state.exploreFeed.map(post => <Post username={this.state.userInfo.username} user_id={this.state.userInfo.id} post={post} key={post.id} />)}
      </div>
    );
  }
}

export default Explore;
