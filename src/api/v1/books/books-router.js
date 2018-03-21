const express = require('express'),
  router = express.Router(),
  auth = require('../auth/auth.js'),
  controllers = require('./books-controllers.js');

router.param('id', controllers.interceptBooksId);

router
  .route('/:id')
  .get(controllers.getBookById)
  .delete(controllers.deleteBook)
  .put(controllers.upload, controllers.updateBook);

// mount addBook controller on post method and root route
router
  .route('/')
  .post(controllers.upload, controllers.addBook)
  .get(controllers.getBooks);

module.exports = router;
