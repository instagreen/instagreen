import axios from 'axios';

const SERVER = 'http://localhost:3000/instagreen';

const apiCaller = {
  getFeed: (user_id, cb) => {
    axios.get(`${SERVER}/feed/${user_id}`)
      .then((feed) => {
        cb(feed);
      })
      .catch((error) => {
        console.log(`Error while trying to get the feed -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

  getComments: (post_id, cb) => {
    axios.get(`${SERVER}/post/comment/${post_id}`)
      .then((comments) => { cb(comments); })
      .catch((error) => {
        console.error(`Error while trying to get comments -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

  getUserInfo: (user_id, cb) => {
    axios.get(`${SERVER}/username/${user_id}`)
      .then((user) => {
        cb(user);
      })
      .catch((error) => {
        console.error(`Error while trying to get user info -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

  getPersonalPosts: (user_id, cb) => {
    axios.get(`${SERVER}/user/${user_id}`)
      .then((personalPosts) => {
        console.log('Here is the personal posts I got', personalPosts);
        cb(personalPosts);
      })
      .catch((error) => {
        console.log(`Error while trying to get the personal posts -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

  handlePostCommentToDb: (commentText, user_id, post_id, cb) => {
    axios.post(`${SERVER}/post/comment`, {
      text: commentText,
      user_id,
      post_id,
    })
      .then((comment) => {
        cb(comment);
      })
      .catch((error) => {
        console.log(`Error while trying to post new comment -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },
};

export default apiCaller;
