const AdminModel = require('./admin-model.js');

exports.interceptIds = (req, res, next, id) => {
  // find admin using id
  AdminModel.findById(id, (err, data) => {
    if (err) {
      return next(new Error('could not intercept admin id'));
    }

    // attach admin data on request object
    req.admin = data;
    next();
  });
};

exports.addAdmin = (req, res, next) => {
  // collect admin info from the request object(req.body)
  let adminInfo = req.body;
 
  // create a new instance of adminModel and pass adminInfo
  let admin = new AdminModel(adminInfo);

  // use the save method persist adminInfo into the db
  admin.save((err, data) => {
    if (err) {
      return next(new Error('could not add admin'));
    }

    res.status(200).json(data);
  });
};

exports.getAdminById = (req, res, next) => {
  // check for admin data from interceptIds middleware
  if (!req.admin) {
    return next(new Error('could not get admin data by id'));
  }

  res.status(200).json(req.admin);
};

exports.getAdmins = (req, res, next) => {
  // use mongoose find method to fetch all admins information
  AdminModel.find((err, data) => {
    if (err) {
      return next(new Error('could not fetch all admins data'));
    }

    res.status(200).json(data);
  });
};
