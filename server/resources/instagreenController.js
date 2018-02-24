const model = require('./model');

const controller = {
  submitFollowRequest: (req, res) => {
    res.status(200).send({ message: 'OK' });
  },

  addPost: (req, res) => {
    res.status(200).send({ message: 'OK' });
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
    res.status(200).send({ message: 'OK' });
  },

  addNewComment: (req, res) => {
    res.status(200).send({ message: 'OK' });
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
};

module.exports.controller = controller;
