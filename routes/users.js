const express = require('express');
const router = express.Router();
const user = require('../controllers/user_controller');
const post = require('../controllers/post_controller');

router.get('/profile',user.profle);
router.get('/post',post.post);


module.exports = router;