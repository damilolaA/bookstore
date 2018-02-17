const express = require('express'),
	  auth	  = require('./auth.js'),
	  router  = express.Router();

router
	.route('/')
	.post(auth.verifyAdmin)


module.exports = router;