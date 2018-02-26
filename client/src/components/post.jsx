import React from 'react';

const Post = props => (
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
      <input type="text" name="new-comment" placeholder="Write a comment..." />
    </div>
  </div>
);

export default Post;
