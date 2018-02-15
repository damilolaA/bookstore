const express = require('express');
const api = express.Router();
const adminRouter = require('./v1/admin/admin-router.js');

// mount adminRouter on /admin path
api.use('/admin', adminRouter);

module.exports = api;
