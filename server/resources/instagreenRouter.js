const router = require('express').Router();
const { controller } = require('./instagreenController');

router.post('/follow', controller.submitFollowRequest);
router.put('/follow', controller.acceptFollow);
router.delete('/follow', controller.declineFollow);

router.post('/post', controller.addPost);

router.get('/user/:user_id', controller.getUserPosts);

router.get('/explore', controller.getAllPosts);

router.get('/feed/:user_id', controller.getAllFollowerPosts);

router.post('/post/like', controller.addLike);

router.get('/post/comment/:post_id', controller.getCommentsOfPost);
router.post('/post/comment', controller.addNewComment);

router.get('/login', controller.login);

router.post('/signup', controller.signup);

// DEV only
router.all('/test', controller.test);

module.exports.router = router;

