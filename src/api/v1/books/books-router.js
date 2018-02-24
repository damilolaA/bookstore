const express = require('express');
const router  = express.Router();
const controllers = require('./books-controllers.js');

router.param('id', controllers.interceptBooksId);

// mount addBook controller on post method and root route
router.route('/')
	.post(controllers.upload, controllers.addBook);

module.exports = router;