import React from 'react';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      comment: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    // get postID and fetch all comments based on the postID.
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      console.log(this.state.comment);
    }
  }

  render() {
    return (
      <div className="post-component">
        <div className="post-component-image">
          <img alt="test" src="https://images.freeimages.com/images/large-previews/f2c/effi-1-1366221.jpg" height="250" width="250" />
        </div>
        <div className="post-component-description">
          <em><strong><a href="#">Username: </a></strong>Description goes here</em>
        </div>
        <div className="post-component-comment-section">
          <ul>
            <li><strong><a href="#">Username: </a></strong>Comments go here</li>
            <li><strong><a href="#">Username: </a></strong>Comments go here</li>
            <li><strong><a href="#">Username: </a></strong>Comments go here</li>
          </ul>
        </div>
        <div className="post-component-add-comment">
          <input
            type="text"
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
            name="comment"
            placeholder="Write a comment..." />
        </div>
        <div className="post-component-action-buttons">
          <button>Follow</button>
          <button>Like</button>
        </div>
      </div>
    );
  }
}

export default Post;
