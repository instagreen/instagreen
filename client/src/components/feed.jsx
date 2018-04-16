import React from 'react';
import Post from './post.jsx';

const Feed = props => (
  
  <div className="container">
    <h1>Hello, {props.username}</h1>
    {
      props.feed.length > 0 ? 
      props.feed.map(post => <Post username={props.username} user_id={props.user_id} post={post} key={post.id} />)
      : `You don't have any feed yet :(`
    }
  </div>
);

export default Feed;
