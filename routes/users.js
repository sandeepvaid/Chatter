const express = require('express');
const router = express.Router();
const user = require('../controllers/user_controller');
const post = require('../controllers/post_controller');
const passport = require('passport');


router.get('/profile',passport.checkAuthentication,user.profle);
router.get('/post',post.post);
//ROute to the user signin and signup page
router.get('/sign-up',user.signUp);
router.get('/sign-in',user.signIn);


//Module for create user and login user
router.post('/create',user.create);


//Use passport as middlewear to authenticate user request
// router.post('/create-session',passport.authenticate(
//     'local',
//     {failureRedirect: '/user/sign-in'},
// ),user.createSession);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
), user.createSession);


router.get('/sign-out',user.destroySession);

module.exports = router;