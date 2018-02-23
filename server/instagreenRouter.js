const router = require('express').Router();

router.post('/follow', (req, res) => {
  // controller.submitFollowRequest

  // return JSON of the target user
});

router.post('/post', (req, res) => {
  // controller.addPost

  // return JSON of newly created post
});

router.get('/user/:user_id', (req, res) => {
  // controller.getPostsOfUser

  // Return JSON Array of all posts by user

});

router.get('/expolore', (req, res) => {
  // controller.getAllPosts

  // Return JSON Array of all posts in db

});

router.get('/feed', (req, res) => {
  // controller.getPostsOfPeopleFollowed

  // Return JSON Array of all posts of people a user follows

});

router.post('/post/like', (req, res) => {
  // controller.addLike

  // Return Boolean of success or fail
});

router.post('/comment/:post_id', (req, res) => {
  // controller.addNewComment

  // Return JSON of the comment

});

router.put('/follow/accept', (req, res) => {
  // controller.acceptFollow

  // Return boolean of the accept state

});

router.get('/login', (req, res) => {
  // controller.login

  // Return JSON of the user (minus the password)

});

router.post('/signup', (req, res) => {
  // controller.signup

  // Return JSON of the user (minus the password)

});

