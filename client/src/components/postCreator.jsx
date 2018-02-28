import React from 'react';
import Navbar from './navbar.jsx';

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
    if (e.key === 'Enter') {
      let temp = this.state.placeholder;
      this.setState({
        imageUrl: temp,
        placeholder: '',
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
