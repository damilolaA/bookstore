const express = require('express'),
	  router  = express.Router(),
	  controller = require('./booksCategory-controller');

router
	.route('/:id')
	.param(controller.interceptIds)

router
	.route('/')
	.post(controller.addCategory)

module.exports = router;