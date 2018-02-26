import React from 'react';

const CommentEntry = props => (
  <li>
    <strong>{props.comment.user_id}: </strong>{props.comment.text}
  </li>
);

export default CommentEntry;
