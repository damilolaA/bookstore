const BooksModel = require('./books-model.js');

exports.interceptBooksId = (req, res, next, id) => {

	BooksModel.findById(id, (err, data) => {
		if(err) {
			return next(new Error('could not get book id'))
		}

		req.book = data;
		next();
	});
}

exports.addBook = (req, res, next) => {

	let book = req.body,
		bookData = new BooksModel(book);

	console.log(bookData);

	bookData.save((err, data) => {
		if(err) {
			return next(new Error('could not save book'))
		}

		res.status(200).json(data)
	})
}