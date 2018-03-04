import React from 'react';

const CommentEntry = (props) => {
  return (
    <li className="list-group-item">
      <strong>{props.comment.username}: </strong>{props.comment.text}
    </li>
  );
};

export default CommentEntry;

