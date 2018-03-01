const model = require('./model.js');
const mediaUploader = require('./mediaUploader.js');

const controller = {
  submitFollowRequest: (req, res) => {
    model.handleFollowRequest(req.body, (data) => {
      res.send(data);
    });
  },
  // this was converted to create post and utilized your model.addPostToDb
  // addPost: (req, res) => {
  //   model.addPostToDb(req.body, (post) => {
  //     res.send(post);
  //   });
  // },
  createPost: (req, res) => {
    // console.log(req.body); // we'd pass in the post_id to link to the uploaded media
    // grab media from user
    const file = req.files[0];
    // save it
    mediaUploader.saveMediaToUploads(file, (mediaFilePath) => {
      // upload it to cloudinary
      mediaUploader.uploadMediaToStorage(mediaFilePath, (storedMediaInfo) => {
        // remove the uploaded media file
        mediaUploader.removeTempFile(mediaFilePath);
        // get the link to it
        // console.log('storedMediaInfo ====> ', storedMediaInfo);
        const cloudinaryMediaUrl = storedMediaInfo.url;
        // attatch the link with the user_id and description dump it in the in db
        console.log('this is the req.body: =====> ', req.body);
        const postBody = {
          description: req.body.description,
          user_id: req.body.user_id,
          imgUrl: cloudinaryMediaUrl,
        };

        // testing example
        // const postBody = {
        //   description: 'test yo friend',
        //   user_id: 1,
        //   imgUrl: cloudinaryMediaUrl,
        // };
        model.addPostToDb(postBody, (post) => {
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
    res.status(200).send({ message: 'OK' });
  },

  getAllFollowerPosts: ({ params }, res) => { // req.params = { params }
    model.getFeed(params.user_id, (feed) => {
      res.status(200).send(feed);
    });
  },

  getCommentsOfPost: (req, res) => {
    console.log('req.params', req.params);
    model.handleGetAllComments(req.params, (comments) => {
      res.status(200).send(comments);
    });
  },

  addLike: (req, res) => {
    model.handleNewLike(req.body, (thing) => {
      res.send(thing);
    });
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
    model.handleFollowDecline(req.body, (item) => {
      res.send(JSON.stringify(item));
    });
  },

  checkIfFollow: (req, res) => {
    console.log(req.params);
    model.handleCheckFollow(req.params, (isFollowing) => {
      res.send(isFollowing);
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
      res.send(user);
    });
  },

  signup: (req, res) => {
    model.addUserToDb(req.body, (post) => {
      res.send(post);
    });
  },

  verify: (req, res) => {
    model.checkSession(req.session, (response) => {
      res.send(response);
    });
  },

  logout: (req, res) => {
    model.destroySession(req.session, (response) => {
      console.log('---response----', response);
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
