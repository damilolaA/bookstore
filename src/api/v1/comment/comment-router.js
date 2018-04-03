const express = require('express'),
	  router = express.Router(),
	  controller = require('./comment-controller');

router.route('/')
	.post(controller.addComment)
	.get(controller.getComments)

module.exports = router;