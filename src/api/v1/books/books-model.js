const mongoose = require('mongoose'),
  config = require('../../../../config/config.js'),
  mongodbURL = config.mongodbUrl;

let booksSchema;

mongoose.connect(mongodbURL);

booksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: String, required: true },
  publicationDate: { type: String, required: true },
  categoryId: { type: Number, required: true },
  imagePath: { type: String },
  type: { type: String, default: 'Normal' }
});

module.exports = mongoose.model('book', booksSchema);
