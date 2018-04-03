const mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  config = require('../../../../config/config.js'),
  mongoURL = config.mongodbUrl;

let UserSchema;

// create connection between mongodb and mongoose
mongoose.connect(mongoURL);

// define schema/structure for user entity
UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  hash: { type: String, required: true }
});

// call encryptPassword to hash plainText before saving userInfo
UserSchema.pre('save', function(next) {
  this.hash = this.encryptPassword(this.hash);
  next();
});

UserSchema.methods = {
  // method to hash palinText using bcrypt module
  encryptPassword: plainText => {
    if (!plainText) {
      return 'please plain password';
    }

    let salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainText, salt);
  },

  // method to authenticate/validate plainText using bcrypt
  authenticate(plainText) {
    return bcrypt.compareSync(plainText, this.hash);
  }
};

// create admin collection using UserSchema
module.exports = mongoose.model('user', UserSchema);
