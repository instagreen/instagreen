import React from 'react';
import Post from './post.jsx';


const Feed = props => (

  <div>
    {props.feed.map(post => <Post post={post} key={post.id} />)}
  </div>
);

export default Feed;
