const express = require('express'),
    adminRouter = require('./v1/admin/admin-router.js'),
    authRouter  = require('./v1/auth/auth-router.js'),
    api = express.Router();

// mount adminRouter on /admin path
api.use('/admin', adminRouter);

// mount authRouter on /auth path
api.use('/auth', authRouter);

module.exports = api;
