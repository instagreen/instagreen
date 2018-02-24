const model = require('./model.js');

const controller = {
  submitFollowRequest: (req, res) => {
    res.status(200).send({ message: 'OK' });
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

  getAllFollowerPosts: (req, res) => {
    res.status(200).send({ message: 'OK' });
  },

  addLike: (req, res) => {
    model.handleNewLike(req.body, (thing) => {
      res.send(thing);
    });
  },

  addNewComment: (req, res) => {
    model.addCommentToDb(req.body, (thing) => {
      res.send(thing);
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
