const express = require('express'),
	  router = express.Router(),
	  controller = require('./comment-controller');

router.route('/')
	.post(controller.addComment);

module.exports = router;