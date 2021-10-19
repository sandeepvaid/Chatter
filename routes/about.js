const express = require('express');
const router = express.Router();
const about_controller = require('../controllers/about_controller');
console.log("am about router");


router.get('/app',about_controller.app);

module.exports = router;