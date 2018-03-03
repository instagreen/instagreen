import React from 'react';
import Utils from '../utils.js';
import componentConfig from './dropUpload.jsx';
import apiCaller from '../apiCaller.js';
import DropzoneComponent from 'react-dropzone-component';


class PostCreator extends React.Component {
  constructor(props) {
    // console.log('props', props);
    super(props);

    this.state = {
      description: '',
      file: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.eventHandlers = { // these are callbacks that would fire on the following events
      // addedfile: file => console.log('fiiiile: ', file),
      addedfile: (file) => {
        // setting the file in the state to the file the user uploads
        this.setState({ file });
      },

      success: (file, responseFromServer) => {
        // responseFromServer is now the URL of the image
        // this.setState({
        //   imageUrl: responseFromServer,
        //   renderPreview: true,
        // });
      },
    };
  }

  handleChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleClick() {
    const postBody = {
      description: this.state.description,
      user_id: this.props.user_id,
    };
    apiCaller.sendMediaToServer(this.state.file, postBody, (res) => {
      console.log('here is the response from server', res);
    });
    // apiCaller.sendPostToServer(this.props.user_id, this.state.description, this.state.imageUrl, (entry) => {
    //   if (entry.status === 200) {
    //     this.setState({
    //       renderPreview: false,
    //     });
    //   }
    // });
  }

  render() {
    // console.log('--this.PROPS.USER_ID from POSTCREATOR', this.props.user_id);
    return (
      <div className="post-creator">
        <DropzoneComponent
          config={componentConfig}
          eventHandlers={this.eventHandlers}
        />
        <div className="container form-group">
          <textarea onChange={this.handleChange} className="form-control" placeholder="description..." id="exampleTextarea" rows="3" />
          <button type="submit" onClick={this.handleClick} className="btn btn-primary">Post</button>
        </div>
      </div>
    );
  }
}

export default PostCreator;

