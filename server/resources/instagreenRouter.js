const router = require('express').Router();
const { controller } = require('./instagreenController');
const multer = require('multer');

router.post('/follow', controller.submitFollowRequest);
router.put('/follow', controller.acceptFollow);
router.delete('/follow/:user_id/:target_id', controller.declineFollow);
router.get('/follow/:user_id/:target_id', controller.checkIfFollow);
router.get('/follow/:target_id', controller.fetchFollowRequests);
router.get('/username/:user_id', controller.getUserName);
router.post('/post/create', multer({ dest: 'uploads' }).any(), controller.createPost);
router.get('/user/:user_id', controller.getUserPosts);

router.put('/profile/picture', multer({ dest: 'uploads' }).any(), controller.updateProfilePic);
router.put('/profile/bio', controller.updateProfileBio);
router.get('/explore', controller.getAllPosts);
router.get('/feed/:user_id', controller.getAllFollowerPosts);
router.get('/like/:post_id/:user_id', controller.getLike);
router.post('/post/like', controller.addLike);
router.delete('/post/like', controller.removeLike);
router.get('/post/comment/:post_id', controller.getCommentsOfPost);
router.post('/post/comment', controller.addNewComment);
router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/verify', controller.verify);
router.get('/logout', controller.logout);

// DEV only
router.all('/test', multer({ dest: 'uploads' }).any(), controller.test);

module.exports.router = router;

