const express = require('express');
const router = express.Router();
const user = require('../controllers/user_controller');
const post = require('../controllers/post_controller');

router.get('/profile',user.profle);
router.get('/post',post.post);
//ROute to the user signin and signup page
router.get('/sign-up',user.signUp);
router.get('/sign-in',user.signIn);

module.exports = router;