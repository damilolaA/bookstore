const auth = require('./auth.js');

exports.signIn = (req, res) => {
  let token = auth.signToken(req.admin._id);

  req.admin._token = token;

  res.status(200).json(req.admin);
};
