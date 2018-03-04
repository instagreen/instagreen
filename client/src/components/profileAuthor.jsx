import React from 'react';
import Post from './post.jsx';
import apiCaller from '../apiCaller.js';

class ProfileAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userPosts: [],
      bioPlaceholder: '',
      profilePic: '',
      renderEditComponent: false,
      displayName: '',
    };
    this.handleBioChange = this.handleBioChange.bind(this);
    this.updateBio = this.updateBio.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  componentWillMount() {
    apiCaller.getUserInfo(this.props.authorId, (userInfo) => {
      const temp = userInfo.data[0];

      const dp = temp.displayImageUrl || 'http://www.rsa.neu.edu/wp-content/uploads/blank-profile-picture-500x500.png';
      this.setState({
        userInfo: temp,
        bioPlaceholder: temp.bio || '',
        displayName: temp.username.toUpperCase(),
        profilePic: dp,
      });
    });

    apiCaller.getPersonalPosts(this.props.authorId, (response) => {
      const temp = response.data;
      this.setState({ userPosts: temp.reverse() });
    });
  }

  onEditClick() {
    const temp = this.state.renderEditComponent;
    this.setState({
      renderEditComponent: !temp,
    });
  }

  handleBioChange(e) {
    this.setState({
      bioPlaceholder: e.target.value,
    });
  }

  updateBio() {
    apiCaller.handleUpdateBio(this.state.userInfo.id, this.state.bioPlaceholder, (response) => {
      if (response.status === 200) {
        this.setState({
          renderEditComponent: false,
        });
      }
    });
  }

  render() {
    return (
      <div id="profile-component" className="container">
        <div className="row" id="profile-header">
          <div className="col-3">
            <img className="img-thumbnail" alt="" src={this.state.profilePic} />
            <button type="button" className="btn-sml btn-outline-secondary">Change Picture</button>
          </div>
          <div className="col-5">
            <h2>{this.state.displayName}</h2>
            {this.state.renderEditComponent ?
              <div className="form-group edit-bio">
                <textarea
                  className="form-control"
                  placeholder="Add a bio..."
                  value={this.state.bioPlaceholder}
                  onChange={this.handleBioChange}
                />
                <button
                  type="button"
                  className="btn-sml btn-outline-secondary"
                  onClick={this.updateBio}
                >Update
                </button>
              </div>
              :
              <em>{this.state.bioPlaceholder}</em>} <br />
            <strong>Followers: </strong><em>{this.state.userInfo.follower_count}</em><br />
            <strong>Following: </strong><em>{this.state.userInfo.following_count}</em><br /><br />
            <div className="btn-group" role="group">
              <button onClick={this.onEditClick} type="button" className="btn btn-outline-secondary">
                {this.state.renderEditComponent ? 'Cancel' : (this.state.bioPlaceholder ? 'Edit bio' : 'Add a bio')}
              </button>
            </div>
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
