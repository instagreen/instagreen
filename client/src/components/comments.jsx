import React from 'react';
import CommentEntry from './commentEntry.jsx';

const Comments = props => (
  <ul className="comments list-group list-group-flush">
    {props.commentList.map(comment => <CommentEntry key={comment.id} comment={comment} />)}
  </ul>
);

export default Comments;
