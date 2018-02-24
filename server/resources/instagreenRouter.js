const router = require('express').Router();
const { controller } = require('./instagreenController');

router.post('/follow', controller.submitFollowRequest);

router.post('/post', controller.addPost);

router.get('/user/:user_id', controller.getUserPosts);

router.get('/explore', controller.getAllPosts);

router.get('/feed/:user_id', controller.getAllFollowerPosts);

router.post('/post/like', controller.addLike);

router.post('/post/comment', controller.addNewComment);

router.put('/follow/accept', controller.acceptFollow);

router.get('/login', controller.login);

router.post('/signup', controller.signup);

module.exports.router = router;

