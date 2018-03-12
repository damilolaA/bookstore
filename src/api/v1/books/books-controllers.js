const mime = require('mime'),
  BooksModel = require('./books-model.js'),
  multer = require('multer'),
  // tell multer to store files on disk
  storage = multer.diskStorage({
    // define files destination
    destination: './uploads/',

    // use filename property to determine upload file name
    filename: (req, file, cb) => {
      // generate unique number and use mime to get file extension
      cb(null, '123' + '-' + Date.now() + '.' + mime.getExtension(file.mimetype));
    }
  });

let fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
    return cb('please upload a valid book image', false);
  }
  cb(null, true);
};

// instantiate multer to use single property and specify fieldname
exports.upload = multer({ storage, fileFilter }).single('imagePath');

exports.interceptBooksId = (req, res, next, id) => {
  BooksModel.findById(id, (err, data) => {
    if (err) {
      return next(new Error('could not get book id'));
    }

    req.book = data;
    next();
  });
};

exports.addBook = (req, res, next) => {
  // check if a file was uploaded
  let book = req.body,
      filename;
      
  if (req.file) {
    // pass file path to filename
    // filename = req.file.path;
    filename = 'http://192.168.99.100:2000/images/' + req.file.filename;
  }

  // add imagePath property on book object
  book.imagePath = filename;

  // instantiate BooksModel and pass book object
  const bookData = new BooksModel(book);

  // use mongoose save method to persist bookData
  bookData.save((err, data) => {
    if (err) {
      return next(new Error(err));
    }

    res.status(200).json(data);
  });
};

exports.getBooks = (req, res, next) => {
  BooksModel.find((err, data) => {
    if (err) {
      return next(new Error('could not fetch books'));
    }

    res.status(200).json(data);
  });
};

exports.getBookById = (req, res, next) => {
  if (!req.book) {
    return next(new Error('could not find book by id'));
  }

  res.status(200).json(req.book);
};

exports.deleteBook = (req, res, next) => {
  let bookId = req.book._id;

  BooksModel.remove({ _id: bookId }, err => {
    if (err) {
      return next(new Error('could not delete book by Id'));
    }

    res.status(200).json(req.book);
  });
};

exports.updateBook = (req, res, next) => {
  let bookId = req.book._id,
    filename = req.file.path,
    bookData = req.body;

  // add imagePath property on book object
  bookData.imagePath = filename;

  BooksModel.update({ _id: bookId }, bookData, { new: true }, err => {
    if (err) {
      return next(new Error('could not update book by Id'));
    }
  });

  res.status(200).json(bookData);
};
