import React from 'react';
import CommentEntry from './commentEntry.jsx';

const Comments = props => (
  <ul>
    {props.commentList.map(comment => <CommentEntry key={comment.id} comment={comment} />)}
  </ul>
);

export default Comments;
