const CategoryModel = require('./booksCategory-model.js');

exports.interceptIds = (req, res, next, id) => {
	
	CategoryModel.findById({_id: id}, (err, data) => {
		if(err) {
			return next(new Error('could not intercept category id'))
		}

		req.category = data;
		next();
	})
}

exports.addCategory = (req, res, next) => {

	let categoryData = req.body;

	let categoryDetails = new CategoryModel(categoryData);

	categoryDetails.save((err, data) => {
		if(err) {
			return next(new Error('could not add category'))
		}

		res.status(200).json(data)
	})
}









