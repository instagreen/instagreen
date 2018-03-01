import React from 'react';
import Navbar from './navbar.jsx';
import Utils from '../utils.js';
import componentConfig from './dropUpload.jsx';
import DropzoneComponent from 'react-dropzone-component';

class PostCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: '',
      imageUrl: '',
      renderPreview: false,
      filename: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSetImageUrl = this.handleSetImageUrl.bind(this);
    this.handleGetPhotoFromComputer = this.handleGetPhotoFromComputer.bind(this);
  }

  handleChange(e) {
    this.setState({
      placeholder: e.target.value,
    });
  }

  handleSetImageUrl(e) {
    if (e.key === 'Enter' && this.state.placeholder.length) {
      console.log('woo');
      const temp = this.state.placeholder;
      Utils.checkValidImgUrl(temp, (isValid) => {
        if (isValid) {
          console.log('url IS an image');
          this.setState({
            imageUrl: temp,
            placeholder: '',
          });
        } else {
          console.log('url is not an image');
          this.setState({
            placeholder: '',
          });
        }
      });
    }
  }

  handleGetPhotoFromComputer(e) {
    // TODO
    console.log(this.state.imageUrl);
  }

  render() {
    return (
      <div className="post-creator">
        <Navbar />
        <DropzoneComponent
          config={componentConfig}
          djsConfig={Utils.djsConfig}
          eventHandlers={Utils.eventHandlers}
        />
      </div>
    );
  }
}

export default PostCreator;
