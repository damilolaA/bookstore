const express = require('express'),
  auth = require('./auth.js'),
  controller = require('./auth-controller.js'),
  router = express.Router();

router.route('/')
	.post(auth.verifyUser, controller.signUserIn);

module.exports = router;
