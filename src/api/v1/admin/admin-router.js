const express = require('express'),
  controller = require('./admin-controller.js'),
  router = express.Router();

// mount interceptsIds controller on id intercepted by param
router.param('id', controller.interceptIds);

// mount admin controllers on routes with id parameter
router
  .route('/:id')
  .get(controller.getAdminById)
  .delete(controller.deleteAdmin)
  .put(controller.updateAdmin);

// mount admin controllers on the root path
router
  .route('/')
  .post(controller.addAdmin)
  .get(controller.getAdmins);

module.exports = router;
