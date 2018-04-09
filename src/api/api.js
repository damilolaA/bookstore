const express = require('express'),
  adminRouter = require('./v1/admin/admin-router.js'),
  authRouter = require('./v1/auth/auth-router.js'),
  userAuthRouter = require('./v1/auth/user-auth-router.js'),
  categoryRouter = require('./v1/booksCategory/booksCategory-router.js'),
  booksRouter = require('./v1/books/books-router.js'),
  userRouter = require('./v1/user/user-router.js'),
  commentRouter = require('./v1/comment/comment-router.js'),
  cartRouter = require('./v1/cart/cart-router.js'),
  api = express.Router();

// mount adminRouter on /admin path
api.use('/admin', adminRouter);

// mount authRouter on /auth path
api.use('/auth', authRouter);

// mount userAuthRouter on /userAuth path
api.use('/userAuth', userAuthRouter);

// mount categoryRouter on /category path
api.use('/category', categoryRouter);

// mount booksRouter on /books path
api.use('/books', booksRouter);

// mount userRouter on /user path
api.use('/user', userRouter);

// mount commentRouter on /comment path
api.use('/comment', commentRouter);

// mount cartRouter on /cart path
api.use('/cart', cartRouter);

module.exports = api;
