import React from 'react';
// import Post from
const Profile = (props) => {
  console.log('--PROPS.USER_ID from PROFILE', props.user_id);
  return (
    <div id="profile-component">
    PROFILE
      {/* <section id="profile-header">
        <img src={props.user.profile_picture} alt="Profile of someone" />
        <h2>Username{props.user.username}</h2>
        <p> {props.user.bio}</p>
        <h3>Followers {props.user.followers_count}</h3>
        <h3>Following {props.user.following_count}</h3>
      </section>
      
      <section id="personal-posts">
        {props.personalPosts.map((post) => { return <Post post={post} key={post.id} />; })}
      </section> */}
    </div>
  );
};

export default Profile;
