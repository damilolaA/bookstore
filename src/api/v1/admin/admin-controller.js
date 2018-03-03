const AdminModel = require('./admin-model.js'),
      redisClient = require('redis').createClient,
      redis = redisClient(6379, 'redis');

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
  let adminInfo = req.body,
    // create a new instance of adminModel and pass adminInfo
    admin = new AdminModel(adminInfo);

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
  // search redis server for data if cached
  redis.get('getAllAdmins', (err, resp) => {
    if(err) {
      return next(new Error('error fetch from cache'))
    }

    if(resp) {
      console.log('done by redis');
      res.status(200).json(JSON.parse(resp));
    } else {
      // use mongoose find method to fetch all admins information
      AdminModel.find((err, data) => {
        if (err) {
          return next(new Error('could not fetch all admins data'));
        }

        redis.setex('getAllAdmins', 300, JSON.stringify(data))
        console.log('done by server');
        res.status(200).json(data);
      });
    }
  });
};

exports.deleteAdmin = (req, res, next) => {
  // get admin id from req.user object
  let id = req.admin._id;

  AdminModel.remove({ _id: id }, err => {
    if (err) {
      return next(new Error('could not delete admin'));
    }

    res.status(200).json(req.admin);
  });
};

exports.updateAdmin = (req, res, next) => {
  // collect admin id and new Admin data from req.admin and req.body respectively
  let id = req.admin._id,
    newData = req.body;

  AdminModel.update({ _id: id }, newData, { new: true }, err => {
    if (err) {
      return next(new Error('could not update Admin Info'));
    }
  });

  res.status(200).json(newData);
};
