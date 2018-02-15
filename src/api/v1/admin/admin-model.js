const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");

let adminSchema;

// create connection between mongodb and mongoose
mongoose.connect('mongodb://mongo/bookstore');

// define schema/structure for admin entity
adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true }
});

// call encryptPassword to hash plainText before saving adminInfo
adminSchema.pre('save', function(next) {
	this.hash = this.encryptPassword(this.hash);
	next();
});

adminSchema.methods = {

	// method to hash palinText using bcrypt module
	encryptPassword: (plainText) => {
		if(!plainText) {
			return "please plain password";
		}

		let salt = bcrypt.genSaltSync();
		return bcrypt.hashSync(plainText, salt);
	},

	// method to authenticate/validate plainText using bcrypt
	authenticate: (plainText) => {
		return bcrypt.compareSync(plainText, this.hash);
	}
}

// create admin collection using adminSchema
module.exports = mongoose.model('admin', adminSchema);
