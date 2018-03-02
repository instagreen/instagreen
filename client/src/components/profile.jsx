import React from 'react';
import Post from './post.jsx';
import apiCaller from '../apiCaller.js';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userPosts: [],
    };
  }

  componentWillMount() {
    apiCaller.getUserInfo(this.props.user_id, (userInfo) => {
      this.setState({ userInfo: userInfo.data[0] });
    });

    apiCaller.getPersonalPosts(this.props.user_id, (response) => {
      const temp = response.data;
      this.setState({ userPosts: temp.reverse() });
    });
  }

  render() {
    return (
      <div id="profile-component" className="container">
        <div id="profile-header">
          <img
            src="https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg"
            alt="Profile of someone"
          />
          <h2>{this.state.userInfo.username}</h2>
          <p>Bio: Lorem freakin ipsum</p>
          <h3>Followers {this.state.userInfo.follower_count}</h3>
          <h3>Following {this.state.userInfo.following_count}</h3>
        </div>

        <div id="personal-posts">
          {this.state.userPosts.map(post => <Post post={post} key={post.id} />)}
        </div>
      </div>
    );
  }
}

export default Profile;
