let adminModel = require('./admin-model.js');

exports.interceptIds = (req, res, next, id) => {
  //find admin using id
  adminModel.findById(id, (err, data) => {
    if (err) {
      return next(new Error('could not intercept admin id'));
    }

    //attach admin data on request object
    req.admin = data;
    next();
  });
};

exports.addAdmin = (req, res, next) => {
  //collect admin info from the request object(req.body)
  let adminInfo = req.body;

  //create a new instance of adminModel and pass adminInfo
  let admin = new adminModel(adminInfo);

  //use the save method persist adminInfo into the db
  admin.save((err, data) => {
    if (err) {
      return next(new Error('could not add admin'));
    }

    res.status(200).json(data);
  });
};
