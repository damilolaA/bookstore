const mongoose = require('mongoose'),
	 booksSchema;

mongoose.connect('mongodb/mongo/bookstore');

booksSchema = new mongoose.Schema({
	title: {type: String, required:true},
	author: {type: String, required:true},
	price: {type: Number, required:true},
	publicationDate: {type: Date, required:true},
	categoryId: {}
})