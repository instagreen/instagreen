import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import dropzoneConfigs from './dropUpload.jsx';
import apiCaller from '../apiCaller.js';

class PostCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      file: null,
      displaySuccessPanel: 'hidden-element',
      dropzoneObj: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeFileFromTray = this.removeFileFromTray.bind(this);

    this.eventHandlers = { // these are callbacks that would fire on the following events
      init: (dropzone) => {
        this.setState({ dropzoneObj: dropzone });
      },
      addedfile: (file) => {
        // setting the file in the state to the file the user uploads
        this.setState({ file });
      },
    };
  }

  handleChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  removeFileFromTray() {
    if (this.state.dropzoneObj) {
      this.state.dropzoneObj.removeAllFiles();
    }
  }

  handleClick() {
    const postBody = {
      description: this.state.description || '',
      user_id: this.props.user_id,
    };
    // where to handle post creation in the server
    const serverEndPoint = '/post/create';
    const method = 'post';
    apiCaller.sendMediaToServer(this.state.file, postBody, serverEndPoint, method, (() => {
      // render the success message
      this.setState({ displaySuccessPanel: 'visible-element' });
      // display it for 4 seconds and hide it
      setTimeout((() => {
        this.setState({ displaySuccessPanel: 'hidden-element' });
      }).bind(this), 4000);
      // clear the text area
      this.setState({ description: '' });
      // remove the file from the file drag tray
      this.removeFileFromTray();
    }).bind(this));
  }

  render() {
    // console.log('--this.PROPS.USER_ID from POSTCREATOR', this.props.user_id);
    return (
      <div className="post-creator">
        <p className={`alert alert-success alert-operation ${this.state.displaySuccessPanel}`}>Your media file was uploaded successfully!</p>
        <DropzoneComponent
          config={dropzoneConfigs.componentConfig}
          djsConfig={dropzoneConfigs.djsConfig}
          eventHandlers={this.eventHandlers}
        />
        <div className="container form-group post-panel">
          <textarea onChange={this.handleChange} value={this.state.description} className="form-control" placeholder="description..." id="exampleTextarea" rows="3" />
          <button type="submit" onClick={this.handleClick} className="btn btn-outline-secondary submit-btn">Post</button>
        </div>
      </div>
    );
  }
}

export default PostCreator;

