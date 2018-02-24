const express = require('express'),
  adminRouter = require('./v1/admin/admin-router.js'),
  authRouter = require('./v1/auth/auth-router.js'),
  categoryRouter = require('./v1/booksCategory/booksCategory-router.js'),
  booksRouter = require('./v1/books/books-router.js'),
  api = express.Router();

// mount adminRouter on /admin path
api.use('/admin', adminRouter);

// mount authRouter on /auth path
api.use('/auth', authRouter);

// mount categoryRouter on /category path
api.use('/category', categoryRouter);

// mount booksRouter on /books path
api.use('/books', booksRoutero);

module.exports = api;
