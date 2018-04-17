const express = require('express'),
  router = express.Router(),
  controller = require('./cart-controller');

router
  .route('/')
  .post(controller.addItem)
  .get(controller.fetchItems);

router
  .route('/:id')
  .get(controller.getItem)
  .delete(controller.deleteItem)
  .put(controller.updateItem);

module.exports = router;
