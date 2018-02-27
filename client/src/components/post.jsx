import React from 'react';
import Comments from './comments.jsx';
import apiCaller from '../apiCaller.js';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: false,
      commentList: [],
      comment: '',
      author: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    apiCaller.getUserInfo(this.props.post.user_id, (response) => {
      this.setState({
        author: response.data[0].username,
      });
    });
    apiCaller.getComments(this.props.post.id, (response) => {
      this.setState({
        commentList: response.data,
      });
    });

    
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
          <img alt="test" src={this.props.post.imgUrl} height="250" width="250" />
        </div>
        <div className="post-component-description">
          <em><strong><a href="#">{this.state.author}: </a></strong>{this.props.post.description}</em>
        </div>
        <div className="post-component-comment-section">
          <Comments commentList={this.state.commentList} />
        </div>
        <div className="post-component-add-comment">
          <input
            type="text"
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
            name="comment"
            placeholder="Write a comment..."
          />
        </div>
        <div className="post-component-action-buttons">
          {this.state.isFollowing ? null : <button>Follow</button>}
          <button>Like</button>
        </div>
      </div>
    );
  }
}

export default Post;
