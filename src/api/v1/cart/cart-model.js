const mongoose = require('mongoose'),
  config = require('../../../../config/config.js'),
  mongoURL = config.mongodbUrl;

mongoose.connect(mongoURL);

let cartSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
  total: { type: String, required: true }
});

module.exports = mongoose.model('cart', cartSchema);
