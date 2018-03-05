import React from 'react';
import Post from './post.jsx';
import apiCaller from '../apiCaller.js';
import RequestInbox from './requestInbox.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userPosts: [],
      bioPlaceholder: '',
      profilePic: '',
      renderEditComponent: false,
      displayName: '',
      profilePictureFile: null,
    };
    this.handleBioChange = this.handleBioChange.bind(this);
    this.updateBio = this.updateBio.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.updateProfilePicture = this.updateProfilePicture.bind(this);
  }

  componentWillMount() {
    apiCaller.getUserInfo(this.props.user_id, (userInfo) => {
      const temp = userInfo.data[0];

      const dp = temp.displayImageUrl || 'http://www.rsa.neu.edu/wp-content/uploads/blank-profile-picture-500x500.png';
      this.setState({
        userInfo: temp,
        bioPlaceholder: temp.bio || '',
        displayName: temp.username.toUpperCase(),
        profilePic: dp,
      });
    });

    apiCaller.getPersonalPosts(this.props.user_id, (response) => {
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

  handleFileChange(e) {
    this.setState({ profilePictureFile: e.target.files[0] });
  }

  handleBioChange(e) {
    this.setState({
      bioPlaceholder: e.target.value,
    });
  }
  
  updateProfilePicture() {
    const serverEndPoint = '/profile/picture';
    const method = 'put';
    apiCaller.sendMediaToServer(this.state.profilePictureFile, { user_id: this.state.userInfo.id }, serverEndPoint, method,(response) => {
      const uploadedProfilePicture = response.data;
      this.setState({ profilePic: uploadedProfilePicture });
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

//   <div class="image-upload">
//     <label for="file-input">
//         <img src="placeholder.jpg"/>
//     </label>

//     <input id="file-input" type="file"/>
// </div>

  render() {
    return (
      <div id="profile-component" className="container">
        <RequestInbox user_id={this.props.user_id} />
        <div className="row" id="profile-header">
          <div className="col-3">
            
            <form method="put" encType="multipart/form-data">
              <label className="upload-profile-picture" >
                <img className="img-thumbnail image" alt="" src={this.state.profilePic} />
                  <input hidden type="file" id="profile-picture-upload" name="file" onChange={this.handleFileChange} multiple  />
                <div className="middle">
                  <div className="text">Upload</div>
                </div>
              </label>
              <button type="button" onClick={this.updateProfilePicture} className="btn btn-outline-secondary">Submit</button>
            </form>
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
                  className="btn btn-outline-secondary"
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
          {this.state.userPosts.map(post => <Post post={post} user_id={this.props.user_id} key={post.id} />)}
        </div>
      </div>
    );
  }
}

export default Profile;
