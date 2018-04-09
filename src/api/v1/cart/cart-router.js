const express = require('express'),
	  router  = express.Router(),
	  controller = require('./cart-controller');

router.route('/')
	.post(controller.addItem)
	.get(controller.fetchItems)

router.route('/:id')
	.get(controller.getItem)

module.exports = router;