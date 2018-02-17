const AdminModel = require('../admin/admin-model.js');

exports.verifyAdmin = (req, res, next) => {
	let email = req.body.email,
		password = req.body.password;

	if(!email || !password) {
		return next(new Error('please pass email and password'))
	}

	AdminModel.findOne({email:email}, (err, data) => {
		if(err) {
			return next(new Error('could not find email address'))
		}

		if(!data.authenticate(password)) {
			return next(new Error('invalid email and or password'))
		}

		req.admin = data;
		next()
	})
}