import React from 'react';
import Utils from '../utils.js';
import componentConfig from './dropUpload.jsx';
import apiCaller from '../apiCaller.js';
import DropzoneComponent from 'react-dropzone-component';

class PostCreator extends React.Component {
  constructor(props) {
    console.log('props', props);
    super(props);

    this.state = {
      description: '',
      imageUrl: '',
      renderPreview: false,
      filename: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.eventHandlers = { // these are callbacks that would fire on the following events
      addedfile: file => console.log('fiiiile: ', file),
      success: (file, responseFromServer) => {
        // responseFromServer is now the URL of the image
        this.setState({
          imageUrl: responseFromServer,
          renderPreview: true,
        });
      },
    };
  }

  handleChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleClick(e) {
    console.log(this.state.description);
    apiCaller.sendPostToServer(this.props.user_id, this.state.description, this.state.imageUrl, (entry) => {
      console.log(entry);
    });
  }

  render() {
    console.log('--this.PROPS.USER_ID from POSTCREATOR', this.props.user_id);
    return (
      <div className="post-creator">
      POST CREATOR
        <DropzoneComponent
          config={componentConfig}
          eventHandlers={this.eventHandlers}
        />
        {this.state.renderPreview ?
          <div className="container form-group">
            <textarea onChange={this.handleChange} className="form-control" placeholder="description..." id="exampleTextarea" rows="3" />
            <button type="submit" onClick={this.handleClick} className="btn btn-primary">Post</button>
          </div>
        : null}
      </div>
    );
  }
}

export default PostCreator;
