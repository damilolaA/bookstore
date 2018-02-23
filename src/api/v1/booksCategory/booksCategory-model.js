const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  config = require('../../../../config/config.js'),
  mongoURL = config.mongodbUrl;

let categorySchema, connection;

// create connection between mongoose and mongodb
connection = mongoose.createConnection(mongoURL, auth: { authdb: 'admin'});

// intialize mongoose-auto-increment using mongoose connection
autoIncrement.initialize(connection);

// define category schema
categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true }
});

// pass mongoose-auto-increment plugin to category schema
categorySchema.plugin(autoIncrement.plugin, 'category');

module.exports = mongoose.model('category', categorySchema);
