const express = require('express'),
  router = express.Router(),
  controller = require('./booksCategory-controllers.js');

router.param('id', controller.interceptIds);

router
  .route('/:id')
  .get(controller.getCategoryById)
  .delete(controller.deleteCategory)
  .put(controller.updateCategory);

router
  .route('/')
  .post(controller.addCategory)
  .get(controller.getCategories);

module.exports = router;
