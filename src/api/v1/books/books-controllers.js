const mime = require('mime'),
  BooksModel = require('./books-model.js'),
  multer = require('multer'),
  cloudinary = require('cloudinary'),
  config = require('../../../../config/config.js'),
  // tell multer to store files on disk
  storage = multer.diskStorage({
    // define files destination
    destination: './uploads/',

    // use filename property to determine upload file name
    filename: (req, file, cb) => {
      // generate unique number and use mime to get file extension
      cb(null, '123' + '-' + Date.now() + '.' + mime.getExtension(file.mimetype));
    }
  }),
  recentlyViewed = [];

let fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
    return cb('please upload a valid book image', false);
  }
  cb(null, true);
};

// instantiate multer to use single property and specify fieldname
exports.upload = multer({ storage, fileFilter }).single('imagePath');

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
});

/*exports.interceptBooksId = (req, res, next, id) => {
  BooksModel.findById(id, (err, data) => {
    if (err) {
      return next(new Error('could not get book id'));
    }

    req.book = data;
    next();
  });
};*/

exports.addBook = (req, res, next) => {
  // check if a file was uploaded
  let book = req.body,
      filename;

  if (req.file) {
    // store book image in the cloud using cloudinary
    cloudinary.uploader.upload(req.file.path, (response) => {

      if(response) {
        // add imagePath property gotten from cloudinary response on book object
        book.imagePath = response.secure_url;

        // instantiate BooksModel and pass book object
        const bookData = new BooksModel(book);

        // use mongoose save method to persist bookData
        bookData.save((err, data) => {
          if (err) {
            return next(new Error(err));
          }

          res.status(200).json(data);
        });
      } else {
        return next(new Error('image could not be uploaded'));
      }
    });
  } else {
    return next(new Error('please upload book image'));
  }
};

exports.getBooks = (req, res, next) => {
  BooksModel.find((err, data) => {
    if (err) {
      return next(new Error('could not fetch books'));
    }

    res.status(200).json(data);
  });
};

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
            return true;
        }
    }

    return false;
}

exports.getBookById = (req, res, next) => {

  let id = req.params.id;

  BooksModel.findById(id)
  .populate('comments')
  .exec((err, book) => {
    if (err) {
      return next(new Error('could not find book by id'));
    }

    var result = containsObject(book, recentlyViewed);
    
    if(result) {
      console.log('array contains element already');
    } else {
      recentlyViewed.push(book);
    }
    
    res.status(200).json(book);
  })
}

/*exports.getBookByAuthor = (req, res, next) => {
  BooksModel.find()
    .populate('comments')
    .exec(function(err, author) {
      if(err) {
        return next(new Error('could not find author'));
      }

      res.status(200).json(author);
    });
}*/

exports.getTrending = (req, res, next) => {
  BooksModel.find({ type: 'trending' }, (err, data) => {
    if(err) {
      return next(new Error('could not get trending books'));
    }

    if(data.length > 4) {

     let newData = data.slice(0, 4);

     res.status(200).json(newData);
    } else {
      res.status(200).json(data);
    }
  });
}

exports.getTopSelling = (req, res, next) => {
  BooksModel.findOne({ type: 'topSelling' }, (err, data) => {
    if(err) {
      return next(new Error('could not get topSelling book'))
    }

    res.status(200).json(data);
  });
}

exports.getRecentlyViewed = (req, res, next) => {
  if(recentlyViewed.length === 0) {
    BooksModel.find((err, data) => {
      if(err) {
        return next(new Error('could not fetch books'))
      } else {

        for(var i = 0; i < data.length; i++) {
          recentlyViewed.push(data[i]);

          if(recentlyViewed.length === 4) {
            break;
          }
        }
        res.status(200).json(recentlyViewed);
      }
    })
  } else {
    if(recentlyViewed.length > 4) {
      recentlyViewed.shift();
      console.log('i shifted an array element');
      res.status(200).json(recentlyViewed);
    } else {
      res.status(200).json(recentlyViewed);
    }
  }
};

exports.deleteBook = (req, res, next) => {
  let bookId = req.params.id;

  BooksModel.remove({ _id: bookId }, (err, result) => {
    if (err) {
      return next(new Error('could not delete book by Id'));
    }

    res.status(200).json(result);
  });
};

exports.updateBook = (req, res, next) => {
  let bookId = req.params.id,
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
