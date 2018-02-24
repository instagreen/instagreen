const router = require('express').Router();
const { controller } = require('./instagreenController');

router.post('/follow', controller.submitFollowRequest);

router.post('/post', controller.addPost);

router.get('/user/:user_id', controller.getUserPosts);

router.get('/explore', controller.getAllPosts);

router.get('/feed', controller.getAllFollowerPosts);

router.post('/post/like', controller.addLike);

router.post('/comment/:post_id', controller.addNewComment);

router.put('/follow/accept', controller.acceptFollow);

router.get('/login', controller.login);

router.post('/signup', controller.signup);

// DEV only
router.all('/test', controller.test);

module.exports.router = router;

