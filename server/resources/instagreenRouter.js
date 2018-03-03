const router = require('express').Router();
const { controller } = require('./instagreenController');
const multer = require('multer');

router.post('/follow', controller.submitFollowRequest);
router.put('/follow', controller.acceptFollow);
router.delete('/follow', controller.declineFollow);
router.get('/follow/:user_id/:target_id', controller.checkIfFollow);

router.get('/username/:user_id', controller.getUserName);

router.post('/post/create', multer({ dest: 'uploads' }).any(), controller.createPost);

router.get('/user/:user_id', controller.getUserPosts);

router.get('/explore', controller.getAllPosts);

router.get('/feed/:user_id', controller.getAllFollowerPosts);

router.post('/post/like', controller.addLike);

router.get('/post/comment/:post_id', controller.getCommentsOfPost);
router.post('/post/comment', controller.addNewComment);

router.post('/login', controller.login);

router.post('/signup', controller.signup);

router.get('/verify', controller.verify);

router.get('/logout', controller.logout);

// DEV only
// router.all('/test', controller.test);

// Validation middleware test
// const sessionValidator = (req, res, next) => {
//   if (!req.session.user) {
//     res.send('must be logged in');
//   } else {
//     next();
//   }
// };

module.exports.router = router;

