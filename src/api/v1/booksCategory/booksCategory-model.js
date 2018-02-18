const mongoose = require('mongoose'),
	  autoIncrement = require('mongoose-auto-increment');

let categorySchema, connection;

// create connection between mongoose and mongodb
connection = mongoose.createConnection('mongodb://localhost/bookstore');

// intialize mongoose-auto-increment using mongoose connection
autoIncrement.initialize(connection);

// define category schema
categorySchema = new mongoose.Schema({
	categoryName: {type:String, required:true}
})

// pass mongoose-auto-increment plugin to category schema
categorySchema.plugin(autoIncrement.plugin, 'category');

module.exports = mongoose.model('category', categorySchema);