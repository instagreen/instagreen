import React from 'react';
//import router from '../clientRouter.jsx';

const CommentEntry = (props) => {
  return (
    <li className="list-group-item">
      <strong>{props.comment.username}: </strong>{props.comment.text}
    </li>
  );
};

export default CommentEntry;

// Click on comment authors to render profile?
// const renderAuthorProfile = () => {
  //   router.setRoute('profileAuthor', props.comment.user_id);
  // };
