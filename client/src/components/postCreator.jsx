import React from 'react';
import Navbar from './navbar.jsx';
import Utils from '../utils.js';

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
        <input value={this.state.placeholder} type="url" onChange={this.handleChange} onKeyDown={this.handleSetImageUrl} /><br />
        <em>or</em> <br />
        <button onClick={this.handleGetPhotoFromComputer}>Upload from your computer</button>
        <strong>{this.state.filename}</strong>
      </div>
    );
  }
}

export default PostCreator;
