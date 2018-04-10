const cartModel = require('./cart-model.js');

exports.addItem = (req, res, next) => {
	let itemDetails = req.body,
		price = itemDetails.price,
		quantity = itemDetails.quantity,
		total = price * quantity;

	itemDetails.total = total;

	let item = new cartModel(itemDetails);

	item.save((err, data) => {
		if(err) {
			return next(new Error('could not add item to cart'))
		}

		res.status(200).json(data);
	});
}

exports.fetchItems = (req, res, next) => {
	cartModel.find((err, data) => {
		if(err) {
			return next(new Error('could fetch items'))
		}

		res.status(200).json(data);
	})
}

exports.getItem = (req, res, next) => {
	let id = req.params.id;

	cartModel.findById({_id:id}, (err, data) => {
		if(err) {
			return next(new Error('could not fetch cart item by id'))
		}

		res.status(200).json(data);
	})
}

exports.deleteItem = (req, res, next) => {
	let id = req.params.id;

	cartModel.findByIdAndRemove(id, (err, data) => {
		if(err) {
			return next(new Error('could not delete item'));
		}

		res.status(200).json(data);
	})
}

exports.updateItem = (req, res, next) => {
	let id = req.params.id,
		details = req.body,
		price = details.price,
		quantity = details.quantity,
		total = price * quantity;

	details.total = total;

	cartModel.findByIdAndUpdate(id, details, {new: true}, (err, data) => {
		if(err) {
			return next(new Error('could not update item'))
		}
		res.status(200).json(data)
	})
}