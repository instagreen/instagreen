import React from 'react';
import apiCaller from '../apiCaller.js';

const CommentEntry = props => (
  <li>
    <strong>{props.comment.username}: </strong>{props.comment.text}
  </li>
);

export default CommentEntry;
