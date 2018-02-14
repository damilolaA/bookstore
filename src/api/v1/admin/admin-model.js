let mongoose = require('mongoose'),
  adminSchema;

//create connection between mongodb and mongoose
mongoose.connect('mongodb://mongo/bookstore');

//define schema/structure for admin entity
adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true }
});

//create admin collection using adminSchema
module.exports = mongoose.model('admin', adminSchema);
