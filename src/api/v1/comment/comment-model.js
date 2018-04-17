const mongoose = require('mongoose'),
  config = require('../../../../config/config.js'),
  mongoURL = config.mongodbUrl;

mongoose.connect(mongoURL);

let commentSchema = new mongoose.Schema({
  userId: { type: String },
  comment: { type: String },
  bookId: { type: String },
  fullName: { type: String }
});

module.exports = mongoose.model('Comment', commentSchema);
