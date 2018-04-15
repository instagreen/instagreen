import axios from 'axios';

const SERVER = process.env.REST_SERVER;
// const SERVER = 'https://instagreen.herokuapp.com/instagreen';

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
  checkIsFollowing: (user_id, target_id, cb) => {
    axios.get(`${SERVER}/follow/${user_id}/${target_id}`)
      .then((followEntry) => {
        cb(followEntry); // if 0 then not a follower
      })
      .catch((error) => {
        console.log(`Error while trying to check if following -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },
  sendPostToServer: (user_id, description, imgUrl, cb) => {
    axios.post(`${SERVER}/post`, {
      user_id,
      description,
      imgUrl,
    })
      .then(cb)
      .catch((error) => {
        console.log(`Error while trying to send post to db -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

  sendFollowRequestToServer: (user_id, target_id, cb) => {
    axios.post(`${SERVER}/follow`, {
      user_id,
      target_id,
    })
      .then(cb)
      .catch((error) => {
        console.log(`Error while trying to send follow request to db -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },
  sendMediaToServer: (file, body, endPoint, method, cb) => {
    // grouping the file with the form fields
    const formData = new FormData();
    formData.append('file', file);
    if (body) {
      const properties = Object.entries(body);
      properties.forEach((propertyTupal) => {
        // adding the form fields as properties on the request
        // Key value pair
        formData.set(propertyTupal[0], propertyTupal[1]);
      });
    }

    // sending file and fields to server
    axios[method](`${SERVER}${endPoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      cb(response);
    }).catch((response) => {
      console.log('error', response);
    });
  },

  getExploreFeed: (cb) => {
    axios.get(`${SERVER}/explore`)
      .then(cb)
      .catch((error) => {
        console.log(`Error while trying to get explore feed -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

  handleUpdateBio: (user_id, bioText, cb) => {
    axios.put(`${SERVER}/profile/bio`, {
      user_id,
      bio: bioText,
    })
      .then(cb)
      .catch((error) => {
        console.log(`Error while trying to update bio -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

  handleLike: (user_id, post_id, cb) => {
    axios.post(`${SERVER}/post/like`, {
      user_id,
      post_id,
    })
      .then(cb)
      .catch((error) => {
        console.log(`Error while trying to process new Like -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

  handleUnlike: (user_id, post_id, cb) => {
    axios.delete(`${SERVER}/post/like`, {
      data: {
        user_id,
        post_id,
      },
    })
      .then(cb)
      .catch((error) => {
        console.log(`Error while trying to unlike -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

  checkLiked: (user_id, post_id, cb) => {
    axios.get(`${SERVER}/like/${post_id}/${user_id}`)
      .then(cb)
      .catch((error) => {
        console.log(`Error while trying to check like -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

};

export default apiCaller;
