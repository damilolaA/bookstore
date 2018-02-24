const BooksModel = require('./books-model.js');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: '/uploads',
	filename: function(req, file, cb) {
		cb(null, file.originalname)
	}
})

exports.upload = multer({storage: storage}).single('imagePath');

/*exports.fileUpload = (req, res, next, upload) => {
	if(!req.file) {
		return next(new Error('no file uploaded'))
	}

	console.log(req.file + ' file');
	next()
}*/

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

	if(!req.file) {
		return next(new Error('file not uploaded'));
	}

	let filename = req.file.path;
	let book = req.body;

	book['imagePath'] = filename;

	let bookData = new BooksModel(book);

	console.log(bookData);

	bookData.save((err, data) => {
		if(err) {
			return next(new Error('could not save book'))
		}

		res.status(200).json(data)
	})
}