const mongoose = require('mongoose'),
	  autoIncrement = require('mongoose-auto-increment');

let categorySchema, connection;

connection = mongoose.connect('mongodb/mongo/bookstore');

autoIncrement.initialize(connection);

categorySchema = new mongoose.Schema({
	categoryName: {type:String, required:true}
})

categoryName.plugin(autoIncrement.plugin, 'category');

module.exports = mongoose.model('category', categorySchema);