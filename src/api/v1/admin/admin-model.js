let mongoose = require('mongoose'),
  adminSchema;

mongoose.connect('mongodb://mongo/bookstore');

adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true }
});

module.exports = mongoose.model('admin', adminSchema);
