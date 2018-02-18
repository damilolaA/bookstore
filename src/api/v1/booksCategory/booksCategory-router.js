const express = require('express'),
	  router  = express.Router(),
	  controller = require('./booksCategory-controllers.js');

router
	.param('id', controller.interceptIds)

router
	.route('/')
	.post(controller.addCategory)

module.exports = router;