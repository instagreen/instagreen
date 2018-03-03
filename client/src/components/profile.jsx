import React from 'react';
import Post from './post.jsx';
import apiCaller from '../apiCaller.js';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userPosts: [],
      profilePic: '',
      renderEditComponent: false,
      displayName: '',
    };
  }

  componentWillMount() {
    apiCaller.getUserInfo(this.props.user_id, (userInfo) => {
      const temp = userInfo.data[0];
      const dp = temp.displayImageUrl || 'http://www.rsa.neu.edu/wp-content/uploads/blank-profile-picture-500x500.png';
      this.setState({
        userInfo: temp,
        displayName: temp.username.toUpperCase(),
        profilePic: dp,
      });
    });

    apiCaller.getPersonalPosts(this.props.user_id, (response) => {
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
            <em>Bio goes here. lorem freakin ipsum</em> <br />
            <strong>Followers: </strong><em>{this.state.userInfo.follower_count}</em><br />
            <strong>Following: </strong><em>{this.state.userInfo.following_count}</em><br /><br />
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-outline-secondary">Edit</button>
              <button type="button" className="btn btn-outline-secondary">Settings</button>
            </div>
          </div>
        </div>
        <hr />
        <br />
        <div id="personal-posts">
          {this.state.userPosts.map(post => <Post post={post} key={post.id} />)}
        </div>
      </div>
    );
  }
}

export default Profile;
