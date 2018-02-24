const express = require('express');
const router  = express.Router();
const controllers = require('./books-controllers.js');

router.param('id', controllers.interceptBooksId);

router.route('/:id')
	.get(controllers.getBookById)

// mount addBook controller on post method and root route
router.route('/')
	.post(controllers.upload, controllers.addBook)
	.get(controllers.getBooks)

module.exports = router;