const model = require('./model.js');

const controller = {
  submitFollowRequest: (req, res) => {
    model.handleFollowRequest(req.body, (data) => {
      res.send(data);
    });
  },

  addPost: (req, res) => {
    model.addPostToDb(req.body, (post) => {
      res.send(post);
    });
  },

  getUserPosts: (req, res) => {
    res.status(200).send({ message: 'OK' });
  },

  getAllPosts: (req, res) => {
    res.status(200).send({ message: 'OK' });
  },

  getAllFollowerPosts: ({ params }, res) => { // req.params = { params }
    // const user_id = req.body.user_id;
    const { user_id } = params; // user_id = params.user_id
    model.getFeed(user_id, (feed) => {
      res.status(200).send(feed);
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
    res.status(200).send({ message: 'OK' });
  },

  login: (req, res) => {
    res.status(200).send({ message: 'OK' });
  },

  signup: (req, res) => {
    res.status(200).send({ message: 'OK' });
  },

  // DEV only
  test: (req, res) => {
    model.test(req.body, (thing) => {
      res.send(thing);
    });
  },
};

module.exports.controller = controller;
