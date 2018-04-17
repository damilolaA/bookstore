const UserModel = require('./user-model.js');

exports.interceptId = (req, res, next, id) => {
  UserModel.findById(id, (err, data) => {
    if (err) {
      return next(new Error('could not intercept user id'));
    }

    req.user = data;
    next();
  });
};

exports.addUser = (req, res, next) => {
  let userData = req.body;

  let user = new UserModel(userData);

  user.save((err, data) => {
    if (err) {
      return next(new Error('server error while saving user data'));
    }

    res.status(200).json(data);
  });
};

exports.getUserById = (req, res, next) => {
  if (!req.user) {
    return next(new Error('user data could not be fetched'));
  }

  res.status(200).json(req.user);
};

exports.getUsers = (req, res, next) => {
  UserModel.find((err, data) => {
    if (err) {
      return next(new Error('could not fetch user data'));
    }

    res.status(200).json(data);
  });
};

exports.deleteUser = (req, res, next) => {
  let id = req.user._id;

  UserModel.remove({ _id: id }, err => {
    if (err) {
      return next(new Error('could not delete user data'));
    }

    res.status(200).json(req.user);
  });
};

exports.updateUser = (req, res, next) => {
  let id = req.user._id,
    newData = req.body;

  UserModel.update({ _id: id }, newData, { new: true }, err => {
    if (err) {
      return next(new Error('could not update user data'));
    }
  });

  res.status(200).json(newData);
};
