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
    this.renderComments = this.renderComments.bind(this);
  }

  componentDidMount() {
    apiCaller.getUserInfo(this.props.post.user_id, (response) => {
      this.setState({
        author: response.data[0].username,
      });
    });

    apiCaller.checkIsFollowing(this.props.user_id, this.props.post.user_id, (isFollowing) => {
      if (isFollowing.data.length) {
        this.setState({ isFollowing: true });
      }
    });

    this.renderComments();
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  handleEnter(e) {
    if (e.key === 'Enter' && this.state.comment.length) {
      //TODO: ADD TO DB
      apiCaller.handlePostCommentToDb(this.state.comment, this.props.user_id, this.props.post.id, (comment) => {
        this.setState({ comment: '' });
        this.renderComments();
      });
    }
  }

  renderComments() {
    const newCommentList = [];
    apiCaller.getComments(this.props.post.id, (response) => {
      response.data.forEach((comment) => {
        apiCaller.getUserInfo(comment.user_id, (userInfo) => {
          let entry = Object.assign({}, comment);
          entry.username = userInfo.data[0].username;
          newCommentList.push(entry);
        });
      });
    });
    setTimeout(() => {
      this.setState({
        commentList: newCommentList,
      });
    }, 500);
  }

  render() {
    return (
      <div className="post-component card row" Style="width: 32rem;">
        <div className="post-component-image">
          <img alt="test" src={this.props.post.imgUrl} height="510" width="510" />
        </div>
        <div className="post-component-description">
          <em><strong><a href="#">{this.state.author}</a>: </strong>{this.props.post.description}</em>
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
            value={this.state.comment}
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
