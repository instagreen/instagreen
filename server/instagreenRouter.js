const router = require('express').Router();

router.route('/instagreen').all((req, res, next) => {
  next();
});
