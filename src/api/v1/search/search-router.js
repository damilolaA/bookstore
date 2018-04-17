let express = require('express'),
	router  = express.Router(),
	controller = require('./search-controller.js');

router.route('/')
	.post(controller.search)


module.exports = router;