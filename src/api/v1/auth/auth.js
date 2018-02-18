const jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt'),
  AdminModel = require('../admin/admin-model.js'),
  checkToken = expressJwt({ secret: 'adminToken' });

exports.decodeToken = (req, res, next) => {
  checkToken(req, res, next);
};

exports.verifyAdmin = (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new Error('please pass email and password'));
  }

  AdminModel.findOne({ email }, (err, data) => {
    if (err) {
      return next(new Error('could not find email address'));
    }

    if (data == null) {
      return next(new Error('invalid username and/or password'));
    }

    if (!data.authenticate(password)) {
      return next(new Error('invalid username and/or password'));
    }

    let objData = data.toObject();

    objData.msg = 'Login Successful!!!';

    req.admin = objData;
    next();
  });
};

exports.signToken = id => {
  return jwt.sign({ _id: id }, 'adminToken', { expiresIn: 60 * 60 * 24 * 7 });
};
