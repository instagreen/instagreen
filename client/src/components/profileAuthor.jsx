import React from 'react';
import Post from './post.jsx';
import apiCaller from '../apiCaller.js';

class ProfileAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userPosts: [],
      profilePic: '',
      displayName: '',
    };
  }

  componentWillMount() {
    apiCaller.getUserInfo(this.props.authorId, (userInfo) => {
      const temp = userInfo.data[0];

      const dp = temp.displayImageUrl || 'http://www.rsa.neu.edu/wp-content/uploads/blank-profile-picture-500x500.png';
      this.setState({
        userInfo: temp,
        displayName: temp.username.toUpperCase(),
        profilePic: dp,
      });
    });

    apiCaller.getPersonalPosts(this.props.authorId, (response) => {
      const temp = response.data;
      this.setState({ userPosts: temp.reverse() });
    });
  }

  render() {
    return (
      <div id="profile-component" className="container">
        <div className="row" id="profile-header">
          <div className="col-3">
            <img className="img-thumbnail" alt="" src={this.state.profilePic} />
          </div>
          <div className="col-5">
            <h2>{this.state.displayName}</h2>
            <br />
            <strong>Followers: </strong><em>{this.state.userInfo.follower_count}</em><br />
            <strong>Following: </strong><em>{this.state.userInfo.following_count}</em><br /><br />
          </div>
        </div>
        <hr />
        <br />
        <div id="personal-posts">
          {this.state.userPosts.map(post => <Post post={post} user_id={this.props.authorId} key={post.id} />)}
        </div>
      </div>
    );
  }
}

export default ProfileAuthor;
