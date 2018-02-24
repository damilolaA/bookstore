const BooksModel = require('./books-model.js');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

// tell multer to store files on disk
const storage = multer.diskStorage({
	// define files destination
	destination: '/uploads',

	// use filename property to determine upload file name
	filename: function(req, file, cb) {

		let generatedId = uuidv4(),
			fileName = file.originalname + generatedId;

		cb(null, filename);
	}
})

// instantiate multer to use single property and specify fieldname
exports.upload = multer({storage: storage}).single('imagePath');

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

	// check if a file was uploaded 
	if(!req.file) {
		return next(new Error('file not uploaded'));
	}

	// pass file path to filename 
	let filename = req.file.path;
	let book = req.body;

	// add imagePath property on book object
	book['imagePath'] = filename;	

	// instantiate BooksModel and pass book object
	let bookData = new BooksModel(book);

	console.log(bookData);

	// use mongoose save method to persist bookData
	bookData.save((err, data) => {
		if(err) {
			return next(new Error('could not save book'))
		}

		res.status(200).json(data)
	})
}