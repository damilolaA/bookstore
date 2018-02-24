const mongoose = require('mongoose'),
	  config   = require('../../../config/config.js'),
	  mongodbURL = config.mongodbUrl,
	 booksSchema;

mongoose.connect(mongodbURL);

booksSchema = new mongoose.Schema({
	title: {type: String, required:true},
	author: {type: String, required:true},
	price: {type: Number, required:true},
	publicationDate: {type: Date, required:true},
	categoryId: {}
})