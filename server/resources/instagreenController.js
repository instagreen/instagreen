const bcrypt = require('bcryptjs');
const model = require('./model.js');
const mediaUploader = require('./mediaUploader.js');

const salt = bcrypt.genSaltSync(10);

const controller = {
  submitFollowRequest: (req, res) => {
    model.handleFollowRequest(req.body, (data) => {
      res.send(data);
    });
  },

  updateProfilePic: (req, res) => {
    const file = req.files[0];
    const user_id = req.body.user_id;

    model.getPofilePicCloudinaryId(user_id, (picCloudinaryId) => {
      // save a reference to the old profile pic id at cloudinary to be removed
      // after uploading pic
      const oldPicCloudinaryId = picCloudinaryId;
      console.log('oldPicCloudinaryId', oldPicCloudinaryId);
      // save it to local uploads!
      mediaUploader.saveMediaToUploads(file, (mediaFilePath) => {
        // upload it to cloudinary
        mediaUploader.uploadMediaToStorage(mediaFilePath, (storedMediaInfo) => {
          // remove the uploaded media file
          mediaUploader.removeTempFile(mediaFilePath);
          // get the link to it
          // constructing the profile pic info object so it can be stored in the db
          // after we received the media url on cloudinary
          const profilePicInfo = {
            user_id,
            picCloudinaryId: storedMediaInfo.public_id,
            displayImageUrl: storedMediaInfo.url,
          };
          console.log('profilePicInfo', profilePicInfo);
          model.handleUpdateProfilePic(profilePicInfo, () => {
            // delete the old profile picture stored in cloudinary
            mediaUploader.deleteMediaFromCloudinary(oldPicCloudinaryId, () => {
              // send the new profile pic URL back to the client
              res.status(200).send(storedMediaInfo.url);
            });
          });
        });
      });
    });
  },

  updateProfileBio: (req, res) => {
    model.handleUpdateProfileBio(req.body, (status) => {
      res.send(JSON.stringify(status));
    });
  },

  createPost: (req, res) => {
    // console.log(req.body); // we'd pass in the post_id to link to the uploaded media
    // grab media from user
    const file = req.files[0];
    // save it to local uploads!
    mediaUploader.saveMediaToUploads(file, (mediaFilePath) => {
      // upload it to cloudinary
      mediaUploader.uploadMediaToStorage(mediaFilePath, (storedMediaInfo) => {
        // remove the uploaded media file
        mediaUploader.removeTempFile(mediaFilePath);
        // get the link to it
        // constructing the post object so it can be stored in the db
        // afte we received the media url on cloudinary
        const postBody = {
          description: req.body.description,
          user_id: req.body.user_id,
          imgUrl: storedMediaInfo.url,
        };
        model.addPostToDb(postBody, (post) => {
          // send the URL back to the client
          res.status(201).send(post);
        });
      });
    });
  },

  getUserPosts: ({ params }, res) => { // req.params = { params }
    // const user_id = req.body.user_id;
    const { user_id } = params; // user_id = params.user_id
    model.getPersonalPosts(user_id, (personalPosts) => {
      res.status(200).send(personalPosts);
    });
  },

  getAllPosts: (req, res) => {
    model.getExploreFeed(exploreFeed => res.status(200).send(exploreFeed));
  },

  getAllFollowerPosts: ({ params }, res) => { // req.params = { params }
    model.getFeed(params.user_id, (feed) => {
      res.status(200).send(feed);
    });
  },

  getCommentsOfPost: (req, res) => {
    model.handleGetAllComments(req.params, (comments) => {
      res.status(200).send(comments);
    });
  },

  addLike: (req, res) => {
    model.handleNewLike(req.body, (like) => {
      res.send(like);
    });
  },

  removeLike: (req, res) => {
    model.handleRemoveLike(req.body, item => res.send(JSON.stringify(item)));
  },

  getLike: (req, res) => {
    model.handleGetLike(req.params, entry => res.send(entry));
  },

  addNewComment: (req, res) => {
    model.addCommentToDb(req.body, (comment) => {
      res.send(comment);
    });
  },

  acceptFollow: (req, res) => {
    model.handleFollowAccept(req.body, (item) => {
      res.send(JSON.stringify(item));
    });
  },

  declineFollow: (req, res) => {
    model.handleFollowDecline(req.params, (item) => {
      res.send(JSON.stringify(item));
    });
  },

  checkIfFollow: (req, res) => {
    model.handleCheckFollow(req.params, (isFollowing) => {
      res.send(isFollowing);
    });
  },

  fetchFollowRequests: (req, res) => {
    model.fetchFollowRequests(req.params, (requesters) => {
      res.send(requesters);
    });
  },

  getUserName: (req, res) => {
    model.handleGetUserName(req.params, (username) => {
      res.status(200).send(username);
    });
  },

  login: (req, res) => {
    model.fetchUser(req.body, (user) => {
      req.session.user = req.body.username;
      bcrypt.compare(req.body.password, user[0].password).then((isMatch) => {
        if (isMatch) {
          res.send(isMatch);
        } else {
          res.send('error');
        }
      });
    });
  },

  signup: (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    model.addUserToDb(req.body, (user) => {
      res.send(user);
    });
  },

  verify: (req, res) => {
    model.checkSession(req.session, (response) => {
      res.send(response);
    });
  },

  logout: (req, res) => {
    model.destroySession(req.session, (response) => {
      res.send(response);
    });
  },

  // DEV only
  test: (req, res) => {
    model.test(req.body, (thing) => {
      res.send(thing);
    });
  },
};

module.exports.controller = controller;
