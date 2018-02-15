const express = require('express'),
    adminRouter = require('./v1/admin/admin-router.js'),
    api = express.Router();

// mount adminRouter on /admin path
api.use('/admin', adminRouter);

module.exports = api;
