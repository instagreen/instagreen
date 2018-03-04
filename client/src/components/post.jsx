import React from 'react';
import Comments from './comments.jsx';
import apiCaller from '../apiCaller.js';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: false,
      isRequested: false,
      commentList: [],
      comment: '',
      author: '',
      isLiked: false,
      likesCount: props.post.likes_count,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.handleFollowRequest = this.handleFollowRequest.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  componentWillMount() {
    apiCaller.getUserInfo(this.props.post.user_id, (response) => {
      const temp = response.data[0];
      if (temp.id === this.props.user_id) {
        this.setState({ isFollowing: true });
      }
      this.setState({
        author: temp.username,
      });
    });

    apiCaller.checkIsFollowing(this.props.user_id, this.props.post.user_id, (response) => {
      if (response.data.length && response.data[0].isAccepted) {
        this.setState({ isFollowing: true });
      } else if (response.data.length && !response.data[0].isAccepted) {
        this.setState({ isRequested: true });
      }
    });
    apiCaller.checkLiked(this.props.user_id, this.props.post.id, (item) => {
      if (item.data.length) {
        this.setState({ isLiked: true });
      }
    });
    this.renderComments();
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  handleLike() {
    const count = this.state.likesCount;
    if (this.state.isLiked) {
      apiCaller.handleUnlike(this.props.user_id, this.props.post.id, () => {
        this.setState({
          isLiked: false,
          likesCount: count - 1,
        });
      });
    } else {
      apiCaller.handleLike(this.props.user_id, this.props.post.id, () => {
        this.setState({
          isLiked: true,
          likesCount: count + 1,
        });
      });
    }
  }

  handleEnter(e) {
    if (e.key === 'Enter' && this.state.comment.length) {
      // TODO: ADD TO DB
      apiCaller.handlePostCommentToDb(this.state.comment, this.props.user_id, this.props.post.id, (comment) => {
        this.setState({ comment: '' });
        this.renderComments();
      });
    }
  }

  handleFollowRequest() {
    apiCaller.sendFollowRequestToServer(this.props.user_id, this.props.post.user_id, (response) => {
      if (response.status === 200) {
        this.setState({ isRequested: true });
      }
    });
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
      <div className="post-component card row" style={{ width: '60rem' }} >
        <div className="post-component-image">
          <img alt="test" src={this.props.post.imgUrl} height="auto" width="100%" />
        </div>
        <div className="post-component-description">
          <em><strong><a href="#">{this.state.author}</a>: </strong>{this.props.post.description}</em><br />
          {this.state.likesCount ? <span className="glyphicon glyphicon-heart">{this.state.likesCount}</span> : null}
        </div>
        <div className="post-component-comment-section">
          <Comments commentList={this.state.commentList} />
        </div>
        <div className="post-component-add-comment">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
            name="comment"
            value={this.state.comment}
            placeholder="Write a comment..."
          />
        </div>
        <div className="post-component-action-buttons">
          {this.state.isFollowing ? null :
          <button
            type="button"
            className="btn-sml btn-outline-info"
            disabled={this.state.isRequested}
            onClick={this.handleFollowRequest}
          >
            {this.state.isRequested ? 'Follow Pending' : 'Follow'}
          </button>}
          <button
            type="button"
            className="btn-sml btn-outline-info"
            onClick={this.handleLike}
          >{this.state.isLiked ? 'Unlike' : 'Like'}
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
